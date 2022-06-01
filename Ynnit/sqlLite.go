package YnnitPackage

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDatabase(database string) *sql.DB {
	db, err := sql.Open("sqlite3", database)
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt := `
		PRAGMA foreign_keys = ON;
		CREATE TABLE IF NOT EXISTS users (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS communauter (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE
		);
		CREATE TABLE IF NOT EXISTS post (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commulink INTEGER NOT NULL,
			title TEXT NOT NULL,
			contentPost TEXT NOT NULL,
			user_id INTEGET NOT NULL,
			FOREIGN KEY (commulink) REFERENCES communauter(id),
			FOREIGN KEY (user_id) REFERENCES users(id) 
		);
		CREATE TABLE IF NOT EXISTS comment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			contentComment TEXT NOT NULL,
			userid INTEGET NOT NULL,
			postLink INT,
			FOREIGN KEY (postLink) REFERENCES post(id),
			FOREIGN KEY (userid) REFERENCES users(id) 
		)
		`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return nil
	}
	return db
}

func InsertIntoUsers(db *sql.DB, name string, email string, password string) (int64, error) {
	result, err := db.Exec(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, name, email, password)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}
func UpdatePassUser(db *sql.DB, password string, email string) {
	db.Exec(`UPDATE users SET password = ? WHERE email = ?`, password, email)
}

func UpdateMailUser(db *sql.DB, emailnew string, emailact string) {
	db.Exec(`UPDATE users SET email = ? WHERE email = ?`, emailnew, emailact)
}

func UpdateNameUser(db *sql.DB, name string, email string) {
	db.Exec(`UPDATE users SET name = ? WHERE email = ?`, name, email)
}

func DeleteUser(db *sql.DB, email string) {
	db.Exec(`DELETE FROM users WHERE email = ?`, email)
}

func DbtoStructUser(db *sql.DB) []Users {
	rowsUsers, _ := db.Query("SELECT * FROM users")
	var temptab []Users

	for rowsUsers.Next() {
		var u Users
		err := rowsUsers.Scan(&u.Id, &u.Name, &u.Email, &u.Password)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func DbtoStructComment(db *sql.DB) []Comment {
	rowsUsers, _ := db.Query("SELECT * FROM comment")
	var temptab []Comment

	for rowsUsers.Next() {
		var u Comment
		err := rowsUsers.Scan(&u.Id, &u.Content, &u.UsersID, &u.PostLink)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoComment(db *sql.DB, content string, UserdId int, PostLink int) (int64, error) {
	result, err := db.Exec(`INSERT INTO comment (contentComment, userid, postLink) VALUES (?, ?, ?)`, content, UserdId, PostLink)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}

func DbtoStructCommunauter(db *sql.DB) []Communauter {
	rowsUsers, _ := db.Query("SELECT * FROM communauter")
	var temptab []Communauter

	for rowsUsers.Next() {
		var u Communauter
		err := rowsUsers.Scan(&u.Id, &u.Name)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoCommunauter(db *sql.DB, Name string) (int64, error) {
	result, err := db.Exec(`INSERT INTO communauter (name) VALUES (?)`, Name)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}
func DbtoStructPost(db *sql.DB) []Post {
	rowsUsers, _ := db.Query("SELECT * FROM post")
	var temptab []Post

	for rowsUsers.Next() {
		var u Post
		err := rowsUsers.Scan(&u.Id, &u.CommuLink, &u.Titlte, &u.Content, &u.UsersID)
		if err != nil {
			log.Fatal(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoPost(db *sql.DB, CommuLink int, Titlte string, Content string, UsersID int) (int64, error) {
	result, err := db.Exec(`INSERT INTO post (commuLink, title, contentPost, user_id) VALUES (?,?,?,?)`, CommuLink, Titlte, Content, UsersID)
	if err != nil {
		log.Fatal(err)
	}
	return result.LastInsertId()
}

// func DbtoStructPost(db *sql.DB)
