import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BandServiceService {
  songs = signal<string[]>([]);
  instrumentMap = signal(new Map<string, string[]>());

  constructor() {
    let map: Map<string, string[]> = new Map<string, string[]>();
    map.set('bohemian rhapsody', [
      'vokal',
      'klaver',
      'elguitar',
      'bas',
      'trommer',
    ]);
    map.set('imagine', ['vokal', 'klaver', 'akustisk guitar']);
    map.set('smells like teen spirit', ['vokal', 'elguitar', 'bas', 'trommer']);
    map.set('hotel california', [
      'vokal',
      'akustisk guitar',
      'elguitar',
      'bas',
      'trommer',
    ]);
    map.set('billie jean', ['vokal', 'bas', 'trommer', 'synthesizer']);
    map.set('hey jude', ['vokal', 'klaver', 'bas', 'trommer', 'orkester']);
    map.set('respect', ['vokal', 'klaver', 'trommer', 'horn']);
    map.set('what’s going on', [
      'vokal',
      'bas',
      'trommer',
      'saxofon',
      'guitar',
    ]);
    map.set('stairway to heaven', [
      'vokal',
      'akustisk guitar',
      'elguitar',
      'bas',
      'trommer',
      'fløjte',
    ]);
    map.set('rolling in the deep', [
      'vokal',
      'klaver',
      'trommer',
      'bas',
      'guitar',
    ]);
    this.instrumentMap.set(map);

    const songs = [
      'Bohemian Rhapsody',
      'Imagine',
      'Smells Like Teen Spirit',
      'Hotel California',
      'Billie Jean',
      'Hey Jude',
      'Respect',
      'What’s Going On',
      'Stairway to Heaven',
      'Rolling in the Deep',
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
