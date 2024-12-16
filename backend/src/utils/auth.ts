export const isAuthenticated = (next:any) => (root: any, args:any, context:any, info:any) => {
    if (!context.user){
        throw new Error("Not authenticated");
    }

    return next(root, args, context, info);
};

export const hasRole = (role: string, next: any) =>(
    root: any, 
    args:any,
    context: any,
    info:any
) => {
    console.log(context);
    if (!context.user){
        throw new Error("Not authenticated ji");
    }
    if (context.user.role !== role){
        throw new Error("Not authenticated");
    }
    
    return next(root, args, context, info);
};