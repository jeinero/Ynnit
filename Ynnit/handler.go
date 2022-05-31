package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var users = []Users{}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Home!")
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(users)
}

func Handler() {
	db := InitDatabase("./test.db")
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/users/{id}", UsersHandler)
	http.Handle("/", r)
	defer db.Close()
	users = test(db)
	fmt.Println(users)
	log.Fatal(http.ListenAndServe(":8080", r))
}
