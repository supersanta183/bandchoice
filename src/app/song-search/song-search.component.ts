import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { BandServiceService } from '../band-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

@Component({
  selector: 'app-song-search',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './song-search.component.html',
  styleUrl: './song-search.component.css',
})
export class SongSearchComponent {
  songResult = signal<string[]>([]);
  selectedInstrument = signal<string>('');
  selectedSong = signal<string>('');
  constructor(private bandService: BandServiceService) {}
  @ViewChild('score', { static: true }) scoreEl!: ElementRef<HTMLDivElement>;
  @ViewChild('modal1', { static: true })
  modalRef!: ElementRef<HTMLDialogElement>;

  // dummy data: four quarter notes and one half note
  notesData = [
    { keys: ['c/4'], duration: 'q' },
    { keys: ['d/4'], duration: 'q' },
    { keys: ['e/4'], duration: 'q' },
    { keys: ['f/4'], duration: 'q' },
    { keys: ['g/4'], duration: 'h' },
  ];

  onSongSearch(searchQuery: string) {
    const result = this.bandService.searchSong(searchQuery);
    this.songResult.set(result);
  }

  getInstrumentsForSong(songName: string): string[] {
    const result = this.bandService.getInstrumentsForSong(songName);
    return result;
  }

  openModal(instrument: string, song: string) {
    this.selectedInstrument.set(instrument);
    this.selectedSong.set(song);
    // 1. show the dialog
    this.modalRef.nativeElement.showModal();

    // 2. render the VexFlow score into the #score div
    this.renderNotes();
  }

  private renderNotes() {
    const container = this.scoreEl.nativeElement;

    // clear any previous SVG
    container.innerHTML = '';

    // set up VexFlow
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(450, 150);
    const context = renderer.getContext();

    // stave
    const stave = new Stave(10, 40, 400).addClef('treble');
    stave.setContext(context).draw();

    // notes
    const vfNotes = this.notesData.map(
      (n) => new StaveNote({ keys: n.keys, duration: n.duration })
    );

    // compute total beats (4q + 1h = 6)
    const totalBeats = this.notesData
      .map((n) => (n.duration === 'h' ? 2 : 1))
      .reduce((sum, b) => sum + b, 0);

    // voice & draw
    const voice = new Voice({
      numBeats: totalBeats,
      beatValue: 4,
    }).addTickables(vfNotes);
    new Formatter().joinVoices([voice]).format([voice], 350);
    voice.draw(context, stave);
  }
}
