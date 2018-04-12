json.array! @new_messages do |message|
  json.user_name message.user.name
  json.created_at message.created_at
  json.content message.content
  json.image message.image
  json.image_url message.image.url
  json.id message.id
end
