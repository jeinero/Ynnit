package YnnitPackage

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

var users = []Users{}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello Home!")
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(users)
}

func UserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	for _, user := range users {
		if strconv.Itoa(user.Id) == id {
			json.NewEncoder(w).Encode(user)
		}
	}
}

func Handler() {
	db := InitDatabase("./Ynnit.db")
	defer db.Close()
	users = DbtoStruct(db)

	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler)
	r.HandleFunc("/apiusers", UsersHandler)
	r.HandleFunc("/apiusers/{id}", UserHandler)
	http.Handle("/", r)
	log.Fatal(http.ListenAndServe(":8080", r))
}
