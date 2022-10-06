import React from "react";
import { render } from "react-dom";
import dataAegis from './data_aegis.txt';
import "./style.css";

/*
  Sorts places by distance from a given location
*/

class App extends React.Component {
    state = {
        isLoading: true,
        users: [],
        error: null,
        message: "",
    }
  searchInputChange = e => {
    this.setState({
      searchInput: e.target.value
    });
  };
  apiUsers = [];

  fetchUsers() {
      fetch(dataAegis)
      .then(response => response.json())
      .then(data =>{
      this.apiUsers = data;
          this.setState({
            users: data,
            isLoading: false,
          })
          }
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

componentDidMount() {
    this.fetchUsers();
}
onChangeHandler(e) {
    console.log(this.state.searchInput);
    let newArray = this.apiUsers.filter((d)=>{
        let searchValue = d.nama_panggilan.toLowerCase();
        return searchValue.indexOf(this.state.searchInput.toLowerCase()) !== -1;
    });
    console.log(newArray)
 if(!newArray.length==0){
    this.setState({
        users:newArray,
        isLoading: true,
    })
  }
  else{
    this.setState({
      users:newArray,
      isLoading: false,
  })
  }
}
  render() {
    const {isLoading, users, error, message} = this.state;

    return (
      <body>
        <div>
        <input
          value={this.state.searchInput}
          onChange={this.searchInputChange}
        />
        
        /* Kelompok 25 Menggunakan events OnClick untuk mencari data Array pada data_aegis.txt */
        <button onClick={this.onChangeHandler.bind(this)}>Cari</button>
        {error ? <p>{error.message}</p> : null}
        <ol>
        {isLoading ? (
            users.map(user => {
                const {nama_lengkap, nama_panggilan, nim, nomor_telepon, id_line, tanggal_lahir,hobi,email} = user;
                return (
                    <ul key={nim}>
                        <h1 style={{color: "green"}}>{nama_lengkap}</h1>
                        <p>Nama Lengkap <span>:{nama_lengkap?nama_lengkap:"undefined"}</span></p>
                        <p>Nama Panggilan <span>:{nama_panggilan?nama_panggilan:"undefined"}</span></p>
                        <p>NIM<span>:{nim?nim:"undefined"}</span></p>
                        <p>Nomor Telepon<span>:{nomor_telepon?nomor_telepon:"undefined"}</span></p>
                        <p>ID Line<span>:{id_line?id_line:"undefined"}</span></p>
                        <p>Email<span>:{email?email:"undefined"}</span></p>
                        <p>Hobi<span>:{hobi?hobi:"undefined"}</span></p>
                        <p>Tanggal Lahir<span>:{tanggal_lahir?tanggal_lahir:"undefined"}</span></p>

                    </ul>
                );
            })
        ) : (
            <h3>Data Tidak Ditemukan!</h3>
        )}
        </ol>
    </div>
    </body>
    );
  }
}

render(<App />, document.getElementById("root"));
