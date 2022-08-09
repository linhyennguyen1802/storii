/**
 * 1. Render songs
 * 2. Scroll top 
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when end
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

 
 
const PLAYER_STORAGE_KEY = 'HAANHTUAN_PLAYER'
const cd = $('.cd')
const heading= $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
 

const app ={
    currentIndex:0,
    isPlaying: false,
    isRandom: false,
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    
    songs: [
        {
            name:'Xuân Hạ Thu Đông',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/xuanhathudong.mp3',
            image:'./assets/img/hat01.jpg'
        },
        {
            name:'Ngôi Nhà Hạnh Phúc',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/ngoinhahanhphuc.mp3',
            image:'./assets/img/hat02.jpg'
        },
        {
            name:'Mashup Cô Gái Đến từ Hôm Qua',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/cogaidentuhomqua.mp3',
            image:'./assets/img/hat03.jpg'
        },
        {
            name:'Dẫu Có Lỗi Lầm',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/daucoloilam.mp3',
            image:'./assets/img/hat04.jpg'
        },
        {
            name:'Xuân Thì',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/xuanthi.mp3',
            image:'./assets/img/hat05.jpg'
        },
        {
            name:'Có Chàng Trai Viết Lên Cây',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/cochangtraivietlencay.mp3',
            image:'./assets/img/hat06.jpg'
        },
        {
            name:'Phố Mùa Đông',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/phomuadong.mp3',
            image:'./assets/img/hat07.jpg'
        },
        {
            name:'Ngày Chưa Giông Bão',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/ngaychuagiongbao.mp3',
            image:'./assets/img/hat08.jpg'
        },
        {
            name:'Chưa Bao Giờ',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/chuabaogio.mp3',
            image:'./assets/img/hat09.jpg'
        },
        {
            name:'Tháng Mấy Em Nhớ Anh',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/thangmayemnhoanh.mp3',
            image:'./assets/img/hat10.jpg'
        },
        {
            name:'Tháng 4 Là Lời Nói Dối Của Em',
            singer:'Hà Anh Tuấn',
            path:'./assets/music/thangtulaloimnoidoicuaem.mp3',
            image:'./assets/img/hat11.jpg'
        },
    ],
    setConfig: function(key, value){
       this.config[key] = value 
       localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)) 
    },
    render: function(){
        const htmls = this.songs.map((song, index) =>{
            return `
                <div class="song ${index === this.currentIndex ? 'active' : '' }" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents:function(){
        const cdWidth = cd.offsetWidth
        const _this = this

        //Xử lý cd quay/dừng 
        const cdThumbAnimate = cdThumb.animate([
            {transform:'rotate(360deg)'}
        ],{
            duration: 15000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lý cuộn 
        /*
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            if(newCdWidth > 0){
                cd.style.width = newCdWidth + 'px'
                //cd.style.opcity = newCdWidth/cdWidth
            }else{
                cd.style.width = 0
            }
        }*/
        
        // Xử lý khi play
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }    
        //Khi song đc play 
        audio.onplay = function(){
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        //Khi song bị pause
        audio.onpause = function(){
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //Khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent= Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý tua 
        
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        }
        /*
        progress.oninput = function(e){
            audio.pause()
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
            progress.onchange = function(){
              audio.play()
            }
          }
        }*/

        // Xử lý next 
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lý prev
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lý random
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom) 
        }

        // Xử lý lặp lại một song
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
          };

        // Xử lý next song khi audio end
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.onclick()
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active')
            if(songNode || e.target.closest('.option')){
                // Xử lý click vào song
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
                // Xử lý khi click vào song option
                if(e.target.closest('.option')){

                }
            }

        }

    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',

            })
        },500)
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1 
        }
        this.loadCurrentSong()
    },
    playRandomSong: function(){
        let newIndex 
        do{
            newIndex= Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()

    },
    start: function(){
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe - xử lý các sự kiện
        this.handleEvents()

        //Tãi thông tin bài hát vào UI 
        this.loadCurrentSong()

        //Render playlist
        this.render()

        // Hiển thị trạng thái ban đầu của button repeat & random
        //randomBtn.classList.toggle("active", this.isRandom);
        //repeatBtn.classList.toggle("active", this.isRepeat);
    }

}
app.start()
 
 
 