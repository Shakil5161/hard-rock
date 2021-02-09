const searchSong = () => {
    const searchInput = document.getElementById('search-input').value;
    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
        .then(res => res.json())
        .then(data => songsList(data.data));
}
const songsList = songs => {
    const songsDetails = document.getElementById('some-details');
    songsDetails.innerHTML = '';
    songs.forEach(song => {
        console.log(song);
        const songDetails = document.createElement('div');
        songDetails.className = 'single-result row align-items-center my-3 p-3';
        songDetails.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Singer: <span>${song.artist.name}</span></p>
                        <p class="author lead">Album by: <span>${song.album.title}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/ogg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="allSongLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songsDetails.appendChild(songDetails);
    });
}
const allSongLyrics = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/'${artist}'/'${title}'`)
        .then(res => res.json())
        .then(data => songLyric(data.lyrics));
}
const songLyric = lyrics => {
    const lyricsDiv =  document.getElementById('song-lyrics');
        lyricsDiv.innerText = lyrics ;
}