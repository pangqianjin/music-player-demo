import {useState, useRef, useEffect} from 'react'
import 'video.js/dist/video-js.min.css'
import './App.css';

function App() {
  const [state, setstate] = useState({
    firstPlay: true,//是否是还未播放
    playing: false,// 继续播放或者暂停
    index: 0,
    songs: [
      require('./assets/Ayasa绚沙 - 告白の夜.mp3').default,
      require('./assets/G.E.M.邓紫棋-光年之外-(电影《太空旅客》中文主题曲).aac').default
    ],
  })

  const audio = useRef(null)
  useEffect(()=>{
    audio.current = new Audio(state.songs[0])
  }, [])

  // 切换上一首和下一首
  const handlePreNext = (step)=>{
    return ()=>{
      const index = state.index+step
      if(index>=0&&index<state.songs.length){
        handleClickSong(index)()
      }
    }
  }
  // 暂停和继续
  const handlePlaying = ()=>{
    state.playing? audio.current.pause(): audio.current.play()
    setstate(state=>({...state, firstPlay:false, playing:!state.playing}))
  }
  // 点击歌曲进行播放
  const handleClickSong = (index)=>{
    return ()=>{
      audio.current.pause()
      setstate(state=>({...state, index, firstPlay:false, playing:true}))
      audio.current = new Audio(state.songs[index])
      audio.current.play()
    }
  }

  return (
    <div className="App">
      <h3>播放列表</h3>
      <ol>
        {state.songs.map((song, i)=>{
          return <li onClick={handleClickSong(i)} key={i}>{song}</li>
        })}
      </ol>
      <p>当前正在播放:&nbsp;&nbsp;<strong>{state.songs[state.index]}</strong></p>
      <button onClick={handlePreNext(-1)}>上一首</button>&nbsp;
      <button onClick={handlePlaying}>{state.firstPlay? '播放': state.playing? "暂停": '继续'}</button>&nbsp;
      <button onClick={handlePreNext(1)}>下一首</button>
    </div>
  );
}

export default App;
