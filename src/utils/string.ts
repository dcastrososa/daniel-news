export const truncate = (input: string, limit: number) => {
    const a = input;
    return a.length > limit ? `${a.substring(0, limit)}...` : a;;
};
