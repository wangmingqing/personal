import request from '@/utils/request';

// 上传封面图
export function uploadcover(formData) {
  return request ({
    url: "/admin_lines_article_photo_upload",
    method: "post",
    data: formData,
    dataType: "jsonp",
    processData: false,
    contentType: "application/json"
  })
}
// 获取省份或大洲
export function getprovincelist(data) {
  return request({
    url: "/firstRank",
    method: "post",
    data
  })
}
// 获取城市或国家
export function getcitylist(data) {
  return request({
    url: "/secondRank",
    method: "post",
    data
  })
}

// 文章初始化
export function articleInit(data) {
  return request({
    url: "/admin_lines_article_edit?uid="+data.uid+"&id=",
    method: "get"
  })
}

// 保存文章
export function saveArticle(data) {
  return request({
    url: "/admin_lines_article_edit",
    method: "post",
    data
  })
}
