import { OpenAIProvider } from "./openai-provider";
import { AIConfig } from "./types";
import { createLogger } from '../logger';

const logger = createLogger('ai:qwen');

// 阿里云百炼 (DashScope) OpenAI 兼容模式接口地址
export const QWEN_DEFAULT_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
// 默认使用视觉模型，错题图片识别依赖多模态能力
export const QWEN_DEFAULT_MODEL = "qwen-vl-max";

/**
 * 通义千问 (Qwen) Provider
 *
 * 基于阿里云百炼 DashScope 的 OpenAI 兼容模式实现，
 * 完整复用 OpenAIProvider 的请求/解析逻辑，仅注入 DashScope 的默认 Base URL 和模型。
 * API Key 从 https://bailian.console.aliyun.com/ 获取。
 */
export class QwenProvider extends OpenAIProvider {
    constructor(config?: AIConfig) {
        if (!config?.apiKey) {
            throw new Error("AI_AUTH_ERROR: DASHSCOPE_API_KEY is required for Qwen provider");
        }

        super({
            apiKey: config.apiKey,
            baseUrl: config.baseUrl || QWEN_DEFAULT_BASE_URL,
            model: config.model || QWEN_DEFAULT_MODEL,
        });

        logger.info({
            provider: 'Qwen (DashScope)',
            model: config.model || QWEN_DEFAULT_MODEL,
            baseURL: config.baseUrl || QWEN_DEFAULT_BASE_URL,
        }, 'Qwen Provider initialized');
    }
}
