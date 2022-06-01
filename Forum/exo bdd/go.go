import (
	
	"project_name/mysubpackage"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func initDatabase(database string) *sql.DB {
	db, err := initDatabase("exercice.db", database)
	if err != nil {
		log.Fatal(err)
	}
	request :=	`
				CREATE TABLE IF NO EXISTS Players (
					id INTEGER NOT NULL PRIMARY KEY,
					name TEXT NOT NULL
				)
				`
				_, err = db.Exec(request)
	return db
}

func insertIntoTypes(db *sql.DB, namr string) (int64, error) {
	result, _ := db.Exec(`INSERT INTO Players (name) VALUES (?)`, name)
	return result.LastInsertId()
}

func selectAllFromTable (db *sql.DB, table string) *sql.Rows {
	query := "SELECT * FROM " + table
	result, _ := db.Query(query)
	return result
}
// func deleteSpecieById(db *sql.DB, id int) {

// }
func displayTypesRows(rows *sql.Rows) {
	for rows.Next() {
		var u Type
		err := rows.Scan(&u.Id, &u.Name)
		if err != nil {
			Log.Fatal(err)
		}
		fmt.println(u)
	}
}

func displaySpecieRows(rows *sql.Rows) {
	for rows.Next() {
		var p displaySpecieRows
		err := rows.Scan(&p.Id, &p.TypeId, &p.Name)
		if err != nil {
			Log.Fatal(err)
		}
		fmt.println(p)
	}
}

func main() {
	db := initDatabase("LiveCoding.db")
	defer db.Close()

	insertIntoTypes(db, "geek")
	insertIntoTypes(db, "tryhard")
	insertIntoTypes(db, "CrazyRankUp")

	rowsTypes := selectAllFromTable(db, "types")

	fmt.println(db )
}

type Players struct {
	Id	int
	TypeId	int
	Name string
	Win	int
	Fail int
}