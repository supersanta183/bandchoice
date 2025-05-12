import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BandServiceService {
  songs = signal<string[]>([]);
  instrumentMap = signal(new Map<string, string[]>());

  constructor() {
    let map: Map<string, string[]> = new Map<string, string[]>();
    map.set('smells like teen spirit', ['bas', 'trommer', 'guitar']);
    map.set('bohemian rhapsody', ['bas', 'trommer', 'guitar']);
    map.set('imagine', ['bas', 'trommer', 'guitar']);
    map.set('hotel california', ['bas', 'trommer', 'guitar']);
    map.set('i will always love you', ['bas', 'trommer', 'guitar', 'fløjte']);
    this.instrumentMap.set(map);

    const songs = [
      'Smells like teen spirit',
      'Bohemian Rhapsody',
      'Imagine',
      'Hotel California',
      'I Will Always Love You',
    ];
    this.songs.set(songs);
  }

  public searchSong(searchQuery: string): string[] {
    const result = this.songs().filter((song) =>
      song.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return result;
  }

  public getInstrumentsForSong(songName: string): string[] {
    const result = this.instrumentMap().get(songName);
    if (result === undefined) {
      return [];
    }
    return result;
  }
}
