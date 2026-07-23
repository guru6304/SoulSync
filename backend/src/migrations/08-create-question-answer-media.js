'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question_answer_media', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },

      answer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'question_answers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      uploaded_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      media_type: {
        type: Sequelize.ENUM(
          'image',
          'video',
          'audio',
          'music'
        ),
        allowNull: false,
      },

      file_url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      public_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      thumbnail_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      mime_type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      original_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      file_size: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      display_order: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
},

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });

    await queryInterface.addIndex('question_answer_media', ['answer_id']);
    await queryInterface.addIndex('question_answer_media', ['uploaded_by']);
    await queryInterface.addIndex('question_answer_media', ['media_type']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('question_answer_media');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_question_answer_media_media_type;'
    ).catch(() => {});
  },
};