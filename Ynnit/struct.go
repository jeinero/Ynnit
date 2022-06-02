package YnnitPackage

type AllStructs struct {
	UsersAll        []User
	PostsAll        []Post
	CommunautersAll []Communauter
	CommentsAll     []Comment
}

type User struct {
	Id       int    `json: "id"`
	Name     string `json: "name"`
	Email    string `json: "email"`
	Password string `json: "password"`
}
type Communauter struct {
	Id   int    `json: "id"`
	Name string `json: "name"`
}
type Post struct {
	Id        int    `json: "id"`
	CommuLink int    `json: "commuLink"`
	Titlte    string `json: "title"`
	Content   string `json: "email"`
	UsersID   int    `json: "idUser"`
}
type Comment struct {
	Id       int    `json: "id"`
	Content  string `json: "email"`
	PostLink int    `json: "postLink"`
	UsersID  int    `json: "idUser"`
}
