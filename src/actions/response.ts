export const response = (code: number, message: string): {} => {
     return { message, code }
}
export const responseData = (code: number, message: string, data: [] | {} | null, error: [] | null): {} => {
     return { message, code, data }
}
export const responseError = (code: number, message: string, error: [] | null): {} => {
     return { message, code, error }
}
