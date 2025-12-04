import vine from '@vinejs/vine';
export const getStatusValidator = vine.compile(vine.object({
    params: vine.object({
        code: vine.string().trim().minLength(5).maxLength(20)
    })
}));
//# sourceMappingURL=warranty_validator.js.map