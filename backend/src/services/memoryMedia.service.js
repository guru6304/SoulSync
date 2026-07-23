const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

const coupleService = require('./couple.service');

const memoryRepository = require('../repositories/memory.repository');
const memoryMediaRepository = require('../repositories/memoryMedia.repository');

const {
    validateUploadMedia,
} = require('../validations/memoryMedia.validation');

const MEDIA_TYPES = [
    {
        prefix: 'image/',
        mediaType: 'image',
        resourceType: 'image',
        maxSize: 10 * 1024 * 1024,
    },
    {
        prefix: 'video/',
        mediaType: 'video',
        resourceType: 'video',
        maxSize: 100 * 1024 * 1024,
    },
    {
        prefix: 'audio/',
        mediaType: 'audio',
        resourceType: 'video',
        maxSize: 25 * 1024 * 1024,
    },
];

const getConfiguration = (file) => {
    const config = MEDIA_TYPES.find(item =>
        file.mimetype.startsWith(item.prefix)
    );

    if (!config) {
        throw new ApiError(
            400,
            'Unsupported media type'
        );
    }

    if (file.size > config.maxSize) {
        throw new ApiError(
            400,
            `${config.mediaType} exceeds allowed size`
        );
    }

    return config;
};

class MemoryMediaService {
    async uploadMedia(userId, memoryId, files) {
        const validation = validateUploadMedia({
            memory_id: memoryId,
        });

        if (!validation.isValid) {
            throw new ApiError(
                400,
                'Validation failed',
                validation.errors
            );
        }

        const memory =
            await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(
                404,
                'Memory not found'
            );
        }

        await coupleService.findMembership(
            userId,
            memory.couple_id
        );

        if (!files || files.length === 0) {
            throw new ApiError(
                400,
                'At least one media file is required'
            );
        }

        const uploads = [];

        for (const file of files) {
            const config = getConfiguration(file);

            const uploaded =
                await new Promise((resolve, reject) => {
                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: `soulsync/memories/${memory.id}/${config.mediaType}`,
                                resource_type:
                                    config.resourceType,
                            },
                            (err, result) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }

                                resolve(result);
                            }
                        );

                    stream.end(file.buffer);
                });

            uploads.push({
                memory_id: memory.id,
                uploaded_by: userId,
                media_type: config.mediaType,
                file_url: uploaded.secure_url,
                public_id: uploaded.public_id,
                thumbnail_url: null,
                mime_type: file.mimetype,
                original_name: file.originalname,
                file_size:
                    uploaded.bytes ?? file.size,
                duration:
                    uploaded.duration
                        ? Math.round(uploaded.duration)
                        : null,
            });
        }

        return await memoryMediaRepository.bulkCreate(
            uploads
        );
    }

    async listMedia(userId, memoryId) {
        const memory =
            await memoryRepository.findById(memoryId);

        if (!memory) {
            throw new ApiError(
                404,
                'Memory not found'
            );
        }

        await coupleService.findMembership(
            userId,
            memory.couple_id
        );

        return await memoryMediaRepository.findByMemory(
            memoryId
        );
    }

    async deleteMedia(userId, mediaId) {
        const media =
            await memoryMediaRepository.findById(mediaId);

        if (!media) {
            throw new ApiError(
                404,
                'Media not found'
            );
        }

        if (media.uploaded_by !== userId) {
            throw new ApiError(
                403,
                'Only uploader can delete media'
            );
        }

        await cloudinary.uploader.destroy(
            media.public_id,
            {
                resource_type:
                    media.media_type === 'image'
                        ? 'image'
                        : 'video',
            }
        );

        await memoryMediaRepository.deleteMedia(
            media.id
        );

        return {
            deleted: true,
        };
    }
}

module.exports = new MemoryMediaService();