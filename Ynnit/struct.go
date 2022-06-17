package YnnitPackage

import "database/sql"

type AllStructs struct {
	db              *sql.DB
	UsersAll        []User
	CommunautersAll []Communauter
	PostsAll        []Post
	CommentsAll     []Comment
	TagsAll         []Tags
	LikeAll         []Like
	DislikeALl      []DisLike
}

type User struct {
	Id         int    `json: "id"`
	Name       string `json: "name"`
	Email      string `json: "email"`
	Desc       string `json: "desc"`
	Pp         string `json: "pp"`
	Password   string `json: "password"`
	UsersLevel string `json: "usersLevel"`
	Warn       int    `json: "warn"`
	Date       string `json: "date"`
}
type Communauter struct {
	Id   int    `json: "id"`
	Name string `json: "name"`
	Desc string `json: "desc"`
	Tags string `json: "tags"`
}
type Post struct {
	Id            int    `json: "id"`
	Date          int    `json: "date"`
	CommuLink     int    `json: "commuLink"`
	Title         string `json: "title"`
	Content       string `json: "content"`
	UsersName     string `json: "NameUser"`
	Like          int    `json: "likeCount"`
	NumberComment int    `json: "commentCount"`
}
type Comment struct {
	Id        int    `json: "id"`
	Content   string `json: "content"`
	PostLink  int    `json: "postLink"`
	UsersName string `json: "NameUser"`
	Like      int    `json: "likeCount"`
	Date      int    `json: "date"`
}

type Tags struct {
	Id   int    `json: "id"`
	Name string `json: "name"`
}

type Like struct {
	Id       int `json: "id"`
	UserId   int `json: "userId"`
	PostLink int `json: "postLink"`
}
type DisLike struct {
	Id       int `json: "id"`
	UserId   int `json: "userId"`
	PostLink int `json: "postLink"`
}
