
export const fetchIndexData = async() => {
    return fetch("https://cnodejs.org/api/v1/topics").then(res => res.json());
}
export const fetchDetailData = async(id) => {
    return fetch(`https://cnodejs.org/api/v1/topic/${id}`).then(res => res.json());
}