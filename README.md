## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|


### Association
- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|text|
|image|string|

### Association
- belongs_to :group
- belongs_to :user

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|index: true, foreign_key: true|
|group|references|index: true, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

