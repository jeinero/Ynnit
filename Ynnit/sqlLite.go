package YnnitPackage

import (
	"database/sql"
	"fmt"
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
		CREATE TABLE IF NOT EXISTS user (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			desc TEXT NOT NULL,
			levelUser TEXT NOT NULL,
			date TEXT NOT NULL,	
			warn INTEGET NOT NULL,	
			password TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS communauter (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			desc TEXT NOT NULL,
			date TEXT NOT NULL,
			tags TEXT NOT NULL,
			FOREIGN KEY (tags) REFERENCES categorie(name) 
		);
		CREATE TABLE IF NOT EXISTS post (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			date INTEGER NOT NULL,
			commulink INTEGER NOT NULL,
			title TEXT NOT NULL,
			contentPost TEXT NOT NULL,
			username TEXT NOT NULL,
			FOREIGN KEY (commulink) REFERENCES communauter(id),
			FOREIGN KEY (username) REFERENCES user(name) 
		);
		CREATE TABLE IF NOT EXISTS comment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			contentComment TEXT NOT NULL,
			username TEXT NOT NULL,
			date INTEGER NOT NULL,
			postLink INT,
			FOREIGN KEY (postLink) REFERENCES post(id),
			FOREIGN KEY (username) REFERENCES user(name) 
		);
		CREATE TABLE IF NOT EXISTS likedpost (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			postLike INTEGER NOT NULL,
			userid INTEGER NOT NULL,
			FOREIGN KEY (postLike) REFERENCES post(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS dislikedpost (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			postLike INTEGER NOT NULL,
			userid INTEGER NOT NULL,
			FOREIGN KEY (postLike) REFERENCES post(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS likedcomment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commentLike INTEGER NOT NULL,
			userid INTEGER NOT NULL,
			FOREIGN KEY (commentLike) REFERENCES comment(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS dislikedcomment (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commentLike INTEGER NOT NULL,
			userid INTEGER NOT NULL,
			FOREIGN KEY (commentLike) REFERENCES comment(id),
			FOREIGN KEY (userid) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS categorie (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE
		);
		CREATE TABLE IF NOT EXISTS warnUser (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			text TEXT NOT NULL,
			who INTEGER NOT NULL,
			FOREIGN KEY (who) REFERENCES user(id) 
		);
		CREATE TABLE IF NOT EXISTS warnPost (
			id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			text TEXT NOT NULL,
			what INTEGER NOT NULL,
			FOREIGN KEY (what) REFERENCES post(id)
		);
		`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return nil
	}
	return db
}

func DbtoStructUser(db *sql.DB) []User {
	rowsUsers, _ := db.Query("SELECT * FROM user")
	var temptab []User

	for rowsUsers.Next() {
		var u User
		err := rowsUsers.Scan(&u.Id, &u.Name, &u.Email, &u.Desc, &u.UsersLevel, &u.Date, &u.Warn, &u.Password)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoUser(db *sql.DB, name string, email string, password string, desc string, levelUser string, date string) bool {
	_, err := db.Exec(`INSERT INTO user (name, email, password, desc, levelUser, date, warn) VALUES (?, ?, ?, ?, ?, ?, ?)`, name, email, password, desc, levelUser, date, 0)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdatePassUser(db *sql.DB, id int, password string) bool {
	_, err := db.Exec(`UPDATE user SET password = ? WHERE id = ?`, password, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdateMailUser(db *sql.DB, id int, emailnew string) bool {
	_, err := db.Exec(`UPDATE user SET email = ? WHERE id = ?`, emailnew, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdateWarnUser(db *sql.DB, warn int, name string) bool {
	_, err := db.Exec(`UPDATE user SET warn = ? WHERE name = ?`, warn, name)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func Leveluser(db *sql.DB, id int) string {
	var status string

	sqlStmt := `SELECT levelUser FROM user WHERE id = ?`
	err := db.QueryRow(sqlStmt, id).Scan(&status)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return status

}

func Changeleveluser(db *sql.DB, name string, level string) bool {
	_, err := db.Exec(`UPDATE user SET levelUser = ? WHERE name = ?`, level, name)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func UpdateDescUser(db *sql.DB, id int, descnew string) bool {
	_, err := db.Exec(`UPDATE user SET desc = ? WHERE id = ?`, descnew, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func DeleteUser(db *sql.DB, id int, name string) bool {
	_, err := db.Exec(`DELETE FROM likedcomment WHERE userid = ?`, id)
	if err != nil {
		fmt.Println(err)
		return false
	} else {
		_, err := db.Exec(`DELETE FROM dislikedcomment WHERE userid = ?`, id)
		if err != nil {
			fmt.Println(err)
			return false
		} else {
			_, err := db.Exec(`DELETE FROM dislikedpost WHERE userid = ?`, id)
			if err != nil {
				fmt.Println(err)
				return false
			} else {
				_, err := db.Exec(`DELETE FROM likedpost WHERE userid = ?`, id)
				if err != nil {
					fmt.Println(err)
					return false
				} else {
					_, err := db.Exec(`DELETE FROM comment WHERE username = ?`, name)
					if err != nil {
						fmt.Println(err)
						return false
					} else {
						_, err := db.Exec(`DELETE FROM post WHERE username = ?`, name)
						if err != nil {
							fmt.Println(err)
							return false
						} else {
							_, err := db.Exec(`DELETE FROM user WHERE id = ?`, id)
							if err != nil {
								fmt.Println(err)
								return false
							}
							return true
						}
					}
				}
			}
		}
	}
}

func DeleteCom(db *sql.DB, id int) bool {
	_, err := db.Exec(`DELETE FROM likedcomment WHERE commentLike = ?`, id)
	if err != nil {
		fmt.Println(err)
		return false
	} else {
		_, err := db.Exec(`DELETE FROM dislikedcomment WHERE commentLike = ?`, id)
		if err != nil {
			fmt.Println(err)
			return false
		} else {
			_, err := db.Exec(`DELETE FROM comment WHERE id = ?`, id)
			if err != nil {
				fmt.Println(err)
				return false
			}
			return true
		}
	}
}

func DeletePost(db *sql.DB, id int) bool {
	_, err := db.Exec(`DELETE FROM likedpost WHERE postLike = ?`, id)
	if err != nil {
		fmt.Println(err)
		return false
	} else {
		_, err := db.Exec(`DELETE FROM dislikedpost WHERE postLike = ?`, id)
		if err != nil {
			fmt.Println(err)
			return false
		} else {
			_, err := db.Exec(`DELETE FROM post WHERE id = ?`, id)
			if err != nil {
				fmt.Println(err)
				return false
			}
			return true
		}
	}
}

func UserExists(db *sql.DB, email string, password string) (string, int) {
	var name string
	var id int
	var pass string
	sqlStmt := `SELECT name, id FROM user WHERE email = ?`
	err := db.QueryRow(sqlStmt, email).Scan(&name, &id)
	if err != nil {
		fmt.Println("err", err)
		return "", 0
	} else {
		sqlStmt := `SELECT password FROM user WHERE name = ?`
		err := db.QueryRow(sqlStmt, name).Scan(&pass)
		if err != nil {
			fmt.Println("err", err)
			return "", 0
		} else {
			if password == pass {
				return name, id
			} else {
				return "", 0
			}
		}
	}
}

func DbtoStructComment(db *sql.DB) []Comment {
	rowsUsers, _ := db.Query("SELECT * FROM comment")
	var temptab []Comment

	for rowsUsers.Next() {
		var u Comment
		err := rowsUsers.Scan(&u.Id, &u.Content, &u.UsersName, &u.Date, &u.PostLink)
		if err != nil {
			fmt.Println(err)
		}
		u.Like = countLike(db, "likedcomment", "commentLike", u.Id)
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoComment(db *sql.DB, content string, Username string, PostLink int, Date int) bool {
	_, err := db.Exec(`INSERT INTO comment (contentComment, username, postLink, date) VALUES (?, ?, ?, ?)`, content, Username, PostLink, Date)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func DbtoStructCommunauter(db *sql.DB) []Communauter {
	rowsUsers, _ := db.Query("SELECT * FROM communauter")
	var temptab []Communauter

	for rowsUsers.Next() {
		var u Communauter
		err := rowsUsers.Scan(&u.Id, &u.Name, &u.Desc, &u.Date, &u.Tags)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoCommunauter(db *sql.DB, Name string, Desc string, Date string, Tags string) bool {
	_, err := db.Exec(`INSERT INTO communauter (name, desc, date, tags) VALUES (?, ?, ?, ?)`, Name, Desc, Date, Tags)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func InsertIntoLikePost(db *sql.DB, IdUser int, PostLink int) bool {
	if CheckLikePost(db, IdUser, PostLink) {
		_, err := db.Exec(`INSERT INTO likedpost (userid, postLike) VALUES (?, ?)`, IdUser, PostLink)
		if !CheckDisLikePost(db, IdUser, PostLink) {
		}
		if err != nil {
			fmt.Println(err)
			return false
		}
	} else {
		return false
	}
	return true
}
func CheckLikePost(db *sql.DB, IdUser int, PostLink int) bool {
	var iduser int
	var postlink int
	sqlStmt := `SELECT postLike, userid FROM likedpost WHERE userid = ? AND postLike = ?`
	err := db.QueryRow(sqlStmt, IdUser, PostLink).Scan(&iduser, &postlink)
	if err != nil {
		return true
	} else {
		_, err := db.Exec(`DELETE FROM likedpost WHERE userid = ? AND postLike = ?`, IdUser, PostLink)
		if err != nil {
			fmt.Println(err)
			return false
		}
		return false
	}
}
func DbtoStructLikePost(db *sql.DB) []Like {
	rowsUsers, _ := db.Query("SELECT * FROM likedpost")
	var temptab []Like

	for rowsUsers.Next() {
		var u Like
		err := rowsUsers.Scan(&u.Id, &u.PostLink, &u.UserId)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoDisLikePost(db *sql.DB, IdUser int, PostLink int) bool {
	if CheckDisLikePost(db, IdUser, PostLink) {
		_, err := db.Exec(`INSERT INTO dislikedpost (userid, postLike) VALUES (?, ?)`, IdUser, PostLink)
		if !CheckLikePost(db, IdUser, PostLink) {
		}
		if err != nil {
			fmt.Println(err)
			return false
		}
	}
	return true
}
func CheckDisLikePost(db *sql.DB, IdUser int, PostLink int) bool {
	var iduser int
	var postlink int
	sqlStmt := `SELECT postLike, userid FROM dislikedpost WHERE userid = ? AND postLike = ?`
	err := db.QueryRow(sqlStmt, IdUser, PostLink).Scan(&iduser, &postlink)
	if err != nil {
		return true
	} else {
		_, err := db.Exec(`DELETE FROM dislikedpost WHERE userid = ? AND postLike = ?`, IdUser, PostLink)
		if err != nil {
			fmt.Println(err)
			return false
		}
		return false
	}
}
func DbtoStructDisLikePost(db *sql.DB) []DisLike {
	rowsUsers, _ := db.Query("SELECT * FROM dislikedpost")
	var temptab []DisLike

	for rowsUsers.Next() {
		var u DisLike
		err := rowsUsers.Scan(&u.Id, &u.PostLink, &u.UserId)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func DbtoStructPost(db *sql.DB) []Post {
	rowsUsers, _ := db.Query("SELECT * FROM post")
	var temptab []Post

	for rowsUsers.Next() {
		var u Post
		err := rowsUsers.Scan(&u.Id, &u.Date, &u.CommuLink, &u.Title, &u.Content, &u.UsersName)
		if err != nil {
			fmt.Println(err)
		}
		u.Like = countLike(db, "likedpost", "postLike", u.Id)
		u.NumberComment = countComment(db, u.Id)
		// u.Warn = countWarn(db, "warnPost", "what", u.Id)
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoPost(db *sql.DB, CommuLink int, Title string, Content string, UsersName string, Date int) bool {
	_, err := db.Exec(`INSERT INTO post (commuLink, title, contentPost, username, date) VALUES (?,?,?,?,?)`, CommuLink, Title, Content, UsersName, Date)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func countLike(db *sql.DB, table string, tableRow string, whereID int) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM "+table+" WHERE "+tableRow+" = ?", whereID).Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	return count
}
func countComment(db *sql.DB, whereID int) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM comment  WHERE postLink = ?", whereID).Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	return count
}
func InsertIntoCategorie(db *sql.DB, Name string) bool {
	_, err := db.Exec(`INSERT INTO categorie (name) VALUES (?)`, Name)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func DbtoStructCategorie(db *sql.DB) []Tags {
	rowsUsers, _ := db.Query("SELECT * FROM categorie")
	var temptab []Tags

	for rowsUsers.Next() {
		var u Tags
		err := rowsUsers.Scan(&u.Id, &u.Name)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func InsertIntoLikeComment(db *sql.DB, IdUser int, CommentLink int) bool {
	if CheckLikeComment(db, IdUser, CommentLink) {
		_, err := db.Exec(`INSERT INTO likedcomment (userid, commentLike) VALUES (?, ?)`, IdUser, CommentLink)
		if !CheckDisLikeComment(db, IdUser, CommentLink) {
		}
		if err != nil {
			fmt.Println(err)
			return false
		}
	} else {
		return false
	}
	return true
}
func CheckLikeComment(db *sql.DB, IdUser int, CommentLink int) bool {
	var iduser int
	var commentlink int
	sqlStmt := `SELECT commentLike, userid FROM likedcomment WHERE userid = ? AND commentLike = ?`
	err := db.QueryRow(sqlStmt, IdUser, CommentLink).Scan(&iduser, &commentlink)
	if err != nil {
		return true
	} else {
		_, err := db.Exec(`DELETE FROM likedcomment WHERE userid = ? AND commentLike = ?`, IdUser, CommentLink)
		if err != nil {
			fmt.Println(err)
			return false
		}
		return false
	}
}
func DbtoStructLikeComment(db *sql.DB) []Like {
	rowsUsers, _ := db.Query("SELECT * FROM likedcomment")
	var temptab []Like

	for rowsUsers.Next() {
		var u Like
		err := rowsUsers.Scan(&u.Id, &u.CommentLink, &u.UserId)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoDisLikeComment(db *sql.DB, IdUser int, CommentLink int) bool {
	if CheckDisLikeComment(db, IdUser, CommentLink) {
		_, err := db.Exec(`INSERT INTO dislikedcomment (userid, commentLike) VALUES (?, ?)`, IdUser, CommentLink)
		if !CheckLikeComment(db, IdUser, CommentLink) {
		}
		if err != nil {
			fmt.Println(err)
			return false
		}
	}
	return true
}
func CheckDisLikeComment(db *sql.DB, IdUser int, CommentLink int) bool {
	var iduser int
	var commentlink int
	sqlStmt := `SELECT commentLike, userid FROM dislikedcomment WHERE userid = ? AND commentLike = ?`
	err := db.QueryRow(sqlStmt, IdUser, CommentLink).Scan(&iduser, &commentlink)
	if err != nil {
		return true
	} else {
		_, err := db.Exec(`DELETE FROM dislikedcomment WHERE userid = ? AND commentLike = ?`, IdUser, CommentLink)
		if err != nil {
			fmt.Println(err)
			return false
		}
		return false
	}
}

func DbtoStructDisLikeComment(db *sql.DB) []DisLike {
	rowsUsers, _ := db.Query("SELECT * FROM dislikedcomment")
	var temptab []DisLike

	for rowsUsers.Next() {
		var u DisLike
		err := rowsUsers.Scan(&u.Id, &u.CommentLink, &u.UserId)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}

func DbtoStructWarnUser(db *sql.DB) []Warn {
	rowsUsers, _ := db.Query("SELECT * FROM warnUser")
	var temptab []Warn

	for rowsUsers.Next() {
		var u Warn
		err := rowsUsers.Scan(&u.Id, &u.Content, &u.Link)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoWarnUser(db *sql.DB, Content string, Link int) bool {
	_, err := db.Exec(`INSERT INTO warnUser (text, who) VALUES (?,?)`, Content, Link)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}
func DbtoStructWarnPost(db *sql.DB) []Warn {
	rowsUsers, _ := db.Query("SELECT * FROM warnPost")
	var temptab []Warn

	for rowsUsers.Next() {
		var u Warn
		err := rowsUsers.Scan(&u.Id, &u.Content, &u.Link)
		if err != nil {
			fmt.Println(err)
		}
		temptab = append(temptab, u)
	}
	return temptab
}
func InsertIntoWarnPost(db *sql.DB, Content string, Link int) bool {
	_, err := db.Exec(`INSERT INTO warnPost (text, what) VALUES (?,?)`, Content, Link)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func DelIntoWarnPost(db *sql.DB, id int) bool {
	_, err := db.Exec(`DELETE FROM warnPost WHERE what = ?`, id)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func countWarn(db *sql.DB, table string, tableRow string, whereID int) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM "+table+" WHERE "+tableRow+" = ?", whereID).Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	return count
}
