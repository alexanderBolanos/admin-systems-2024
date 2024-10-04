import { z } from 'zod';
export var Status;
(function (Status) {
    Status[Status["SUCCESS"] = 1] = "SUCCESS";
    Status[Status["FAIL"] = 0] = "FAIL";
    Status[Status["UNKNOW"] = -1] = "UNKNOW";
    Status[Status["WAITING"] = 2] = "WAITING";
})(Status || (Status = {}));
export const BaseDTO = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    status: z.nativeEnum(Status),
    payload: z.record(z.any()).optional(),
});
export function validateDTO(o) {
    const result = BaseDTO.safeParse(o);
    return result;
}
