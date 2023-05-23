import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string,
    description: string,
    expireTime?: Date,
    maxNum: number,
    password?: string,
    // todo 定义枚举值类型
    status: number,
    userId: number,
    hasJoin: boolean,
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinNum?: number;
};