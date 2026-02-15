import React, { useState } from "react"
import axios from "axios"

const API = "https://elitetok-1.onrender.com"

export default function App(){

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [ref,setRef]=useState("")
  const [token,setToken]=useState("")
  const [points,setPoints]=useState(0)
  const [video,setVideo]=useState("")
  const [result,setResult]=useState("")

  const signup=async()=>{
    try{
      await axios.post(API+"/signup",{email,password,ref})
      alert("Signup successful 🎉")
    }catch(e){
      alert("Signup failed")
    }
  }

  const login=async()=>{
    try{
      const r=await axios.post(API+"/login",{email,password})
      setToken(r.data.token)
      setPoints(r.data.points)
    }catch(e){
      alert("Login failed")
    }
  }

  const analyze=async()=>{
    try{
      const r=await axios.post(API+"/analyze",
        {video},
        {headers:{Authorization:token}}
      )
      setResult(JSON.stringify(r.data,null,2))
    }catch(e){
      alert("Analysis failed")
    }
  }

  return (
    <div style={styles.page}>

      <div style={styles.card}>
        <h2>EliteTok</h2>

        <input style={styles.input}
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <input style={styles.input}
          placeholder="Referral Code"
          onChange={e=>setRef(e.target.value)}
        />

        <div>
          <button style={styles.btn} onClick={signup}>
            Signup
          </button>

          <button style={styles.btnAlt} onClick={login}>
            Login
          </button>
        </div>
      </div>

      {token && (

        <div style={styles.dashboard}>

          <div style={styles.panel}>
            <h3>Points</h3>
            <h1>{points}</h1>
          </div>

          <div style={styles.panel}>
            <h3>Analyze Video</h3>

            <input style={styles.input}
              placeholder="Paste Video URL"
              onChange={e=>setVideo(e.target.value)}
            />

            <button style={styles.btn} onClick={analyze}>
              Analyze
            </button>

            <pre style={styles.result}>{result}</pre>
          </div>

          <div style={styles.panel}>
            <h3>Buy Points</h3>

            <p>£10 → 100 Points</p>

            <a href="https://ko-fi.com/elitetok">
              <button style={styles.pay}>
                Pay Now
              </button>
            </a>
          </div>

        </div>
      )}

    </div>
  )
}

const styles={
  page:{
    background:"#0f172a",
    minHeight:"100vh",
    padding:20,
    color:"white",
    fontFamily:"sans-serif"
  },

  card:{
    background:"#1e293b",
    padding:20,
    borderRadius:12,
    maxWidth:320,
    margin:"auto",
    textAlign:"center"
  },

  dashboard:{
    marginTop:30,
    display:"grid",
    gap:20
  },

  panel:{
    background:"#1e293b",
    padding:20,
    borderRadius:12
  },

  input:{
    width:"100%",
    padding:10,
    marginTop:10,
    borderRadius:6,
    border:"none"
  },

  btn:{
    marginTop:10,
    padding:10,
    background:"#22c55e",
    border:"none",
    borderRadius:6,
    color:"white",
    cursor:"pointer"
  },

  btnAlt:{
    marginTop:10,
    marginLeft:10,
    padding:10,
    background:"#3b82f6",
    border:"none",
    borderRadius:6,
    color:"white",
    cursor:"pointer"
  },

  pay:{
    padding:12,
    background:"#f59e0b",
    border:"none",
    borderRadius:8,
    color:"white",
    fontWeight:"bold",
    cursor:"pointer"
  },

  result:{
    marginTop:10,
    background:"#020617",
    padding:10,
    borderRadius:6,
    fontSize:12
  }
}