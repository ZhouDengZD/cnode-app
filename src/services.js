// 获取cnode列表页信息。page：页数；limit：每页的数量.
export const fetchIndexData = async({tab,page,limit}={}) => {
    return fetch(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}`).then(res => res.json());
}
export const fetchDetailData = async(id) => {
    return fetch(`https://cnodejs.org/api/v1/topic/${id}`).then(res => res.json());
}