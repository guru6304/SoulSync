const crypto = require("crypto");

const ApiError = require("../utils/ApiError");
const refreshTokenRepository = require("../repositories/refreshToken.repository");

class RefreshTokenService {
  hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async create(userId, token, expiresAt, transaction = null) {
    const tokenHash = this.hashToken(token);

    return refreshTokenRepository.create(
      {
        user_id: userId,
        token_hash: tokenHash,
        expires_at: expiresAt,
      },
      transaction,
    );
  }

  async verify(token) {
    const tokenHash = this.hashToken(token);

    const refreshToken =
      await refreshTokenRepository.findActiveByHash(tokenHash);

    if (!refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    await refreshTokenRepository.updateLastUsed(refreshToken.id);

    return refreshToken;
  }

  async revoke(token, transaction = null) {
    const tokenHash = this.hashToken(token);

    const refreshToken = await refreshTokenRepository.findByHash(tokenHash);

    if (!refreshToken) {
      return;
    }

    await refreshTokenRepository.revoke(refreshToken.id, transaction);
  }

  async revokeById(id, transaction = null) {
    return refreshTokenRepository.revoke(id, transaction);
  }

  async revokeAll(userId, transaction = null) {
    return refreshTokenRepository.revokeAll(userId, transaction);
  }

  async getActiveSessions(userId) {
    return refreshTokenRepository.findByUser(userId);
  }

  async cleanupExpired() {
    return refreshTokenRepository.deleteExpired();
  }
}

module.exports = new RefreshTokenService();
