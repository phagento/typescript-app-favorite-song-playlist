import {v4 as uuidV4} from 'uuid';

const localStoragePlaylistName = 'fsp';

type Playlist = {
    id: string
    songTitle: string
    songArtist: string
    createdAt: Date
};

const playlistForm = document.getElementById('new-playlist-form') as HTMLFormElement | null;
const songTitle = document.querySelector<HTMLInputElement>('#new-playlist-song-title');
const songArtist = document.querySelector<HTMLInputElement>('#new-playlist-song-artist');
const list = document.querySelector<HTMLOListElement>('#playlist');
const playlist: Playlist[] = loadPlaylist();
playlist.forEach(addPlaylistItem);

playlistForm?.addEventListener('submit', e => {
    e.preventDefault();

    if (songTitle?.value === '' || songTitle?.value === null) {
        alert('Please enter a song title!');
        return;
    }
    if (songArtist?.value === '' || songArtist?.value === null) {
        alert('Please enter a song artist!');
        return;
    }

    const newPlaylist: Playlist = {
        id: uuidV4(),
        songTitle: songTitle.value,
        songArtist: songArtist.value,
        createdAt: new Date(),
    };

    playlist.push(newPlaylist);
    savePlaylist(playlist);

    addPlaylistItem(newPlaylist);

    // Clear all the values after submitting the form
    songTitle.value = '';
    songArtist.value = '';
});

/**
 * Process adding of playlist items
 *
 * @param playlist
 */
function addPlaylistItem(playlist: Playlist) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    label.append(playlist.songTitle);
    label.append(' - ' + playlist.songArtist);
    item.append(label);
    list?.append(item);
}

/**
 * Save the playlist into the localStorage so that it can be retrieved right away
 *
 * @param playlist
 */
function savePlaylist(playlist: Playlist) {
    localStorage.setItem(localStoragePlaylistName, JSON.stringify(playlist));
}

/**
 * Load the playlist saved to the localStorage
 */
function loadPlaylist(): Playlist[] {
    const playlistStorage = localStorage.getItem(localStoragePlaylistName);
    if (playlistStorage === null) {
        return [];
    }

    return JSON.parse(playlistStorage);
}
