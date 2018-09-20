import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { ViewChildren, QueryList } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-slothead',
  templateUrl: './slothead.component.html',
  styleUrls: ['./slothead.component.scss']
})
export class SlotheadComponent implements OnInit {
  @Input() playerScore: number;
  @Input() maxScore: number;
  @Input() minScore: number;
  @Output() scoreIsSet = new EventEmitter<number>();
  @ViewChildren(SwiperComponent) swipers: QueryList<SwiperComponent>;
  private reel1Index: number;
  private reel2Index: number;
  private reel3Index: number;
  private scoreFormConrol = new FormControl('', [
    Validators.max(5000),
    Validators.min(0),
    Validators.required
  ]);
  public matcher = new MyErrorStateMatcher();

  public config: SwiperConfigInterface = {
    slidesPerView: 3,
    freeMode: true,
    freeModeSticky: true,
    freeModeMomentumRatio: 0.25,
    freeModeMinimumVelocity: 0.1,
    loop: true,
    allowTouchMove: false,
    direction: 'vertical',
    slideToClickedSlide: true,
    centeredSlides: true
  };
  public scoreInputDisabled = true;
  public rollButtonDisabled = false;
  public backgroundOfCombo1 = 'white';
  public backgroundOfCombo2 = 'white';
  public backgroundOfCombo3 = 'white';
  public backgroundOfCombo4 = 'white';
  public backgroundOfCombo5 = 'white';
  public backgroundOfCombo6 = 'white';
  public backgroundOfCombo7 = 'white';
  public backgroundOfCombo8 = 'white';
  public backgroundOfCombo9 = 'white';
  public backgroundOfTopLine = 'white';
  public backgroundOfCentralLine = 'white';
  public backgroundOfBotLine = 'white';

  constructor() {}

  ngOnInit() {
    this.scoreFormConrol.disable();
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  toggleGodMode() {
    if (this.scoreFormConrol.disabled) {
      this.scoreFormConrol.enable();
    } else {
      this.scoreFormConrol.disable();
    }
    this.swipers.forEach((swiper, i) => {
      if (swiper.getConfig().allowTouchMove) {
        swiper.getConfig().allowTouchMove = false;
      } else {
        swiper.getConfig().allowTouchMove = true;
      }
    });
  }
  setScore(score: number): void {
    if (
      !this.scoreFormConrol.hasError('min') &&
      !this.scoreFormConrol.hasError('max') &&
      !this.scoreFormConrol.hasError('required')
    ) {
      this.scoreIsSet.emit(score);
    }
  }
  rollRandom(): void {
    if (
      !this.scoreFormConrol.hasError('min') &&
      !this.scoreFormConrol.hasError('max') &&
      !this.scoreFormConrol.hasError('required')
    ) {
      this.scoreIsSet.emit(this.playerScore - 1);
      this.resetAllCombos();
      this.swipers.forEach((swiper, i) => {
        const rollNumber = this.getRandomInt(0, 9);
        this.rollButtonDisabled = true;
        if (i === 0) {
          this.reel1Index = rollNumber;
          swiper.directiveRef.setIndex(rollNumber, 1500);
        } else if (i === 1) {
          this.reel2Index = rollNumber;
          swiper.directiveRef.setIndex(rollNumber, 2000);
        } else if (i === 2) {
          this.reel3Index = rollNumber;
          swiper.directiveRef.setIndex(rollNumber, 2500);
        }
        setTimeout(() => {
          this.rollButtonDisabled = false;
        }, 3000);
      });
    }
  }
  public onIndexChangeReel1(index: number): void {
    this.resetAllCombos();
    this.reel1Index = index;
  }
  public onIndexChangeReel2(index: number): void {
    this.resetAllCombos();
    this.reel2Index = index;
  }
  public onIndexChangeReel3(index: number): void {
    this.resetAllCombos();
    this.reel3Index = index;
  }
  public onTransEnd(): void {
    let swiper1Animating: boolean;
    let swiper2Animating: boolean;
    let swiper3Animating: boolean;
    this.swipers.forEach((swiper, i) => {
      if (i === 0) {
        swiper1Animating = swiper.directiveRef.swiper()['animating'];
      } else if (i === 1) {
        swiper2Animating = swiper.directiveRef.swiper()['animating'];
      } else if (i === 2) {
        swiper3Animating = swiper.directiveRef.swiper()['animating'];
      }
    });
    if (!swiper1Animating && !swiper2Animating && !swiper3Animating) {
      this.checkCombos();
    }
  }

  resetAllCombos() {
    this.backgroundOfCombo1 = 'white';
    this.backgroundOfCombo2 = 'white';
    this.backgroundOfCombo3 = 'white';
    this.backgroundOfCombo4 = 'white';
    this.backgroundOfCombo5 = 'white';
    this.backgroundOfCombo6 = 'white';
    this.backgroundOfCombo7 = 'white';
    this.backgroundOfCombo8 = 'white';
    this.backgroundOfCombo9 = 'white';
    this.backgroundOfTopLine = 'white';
    this.backgroundOfCentralLine = 'white';
    this.backgroundOfBotLine = 'white';
  }
  checkCombos() {
    if (this.reel1Index === 3) {
      if (this.reel2Index === 3) {
        if (this.reel3Index === 3) {
          this.backgroundOfCombo2 = '#cc3300';
          this.backgroundOfTopLine = '#cc3300';
          this.scoreIsSet.emit(this.playerScore + 10);
        } else {
          this.backgroundOfCombo1 = '#cc3300';
          this.backgroundOfTopLine = '#cc3300';
          this.scoreIsSet.emit(this.playerScore + 5);
        }
      } else if (this.reel3Index === 3) {
        this.backgroundOfCombo1 = '#cc3300';
        this.backgroundOfTopLine = '#cc3300';
        this.scoreIsSet.emit(this.playerScore + 5);
      }
    } else if (this.reel1Index === 2) {
      if (this.reel2Index === 2) {
        if (this.reel3Index === 2) {
          this.backgroundOfCombo2 = '#cc3300';
          this.backgroundOfCentralLine = '#cc3300';
          this.scoreIsSet.emit(this.playerScore + 10);
        } else {
          this.backgroundOfCombo1 = '#cc3300';
          this.backgroundOfCentralLine = '#cc3300';
          this.scoreIsSet.emit(this.playerScore + 5);
        }
      } else if (this.reel3Index === 2) {
        this.backgroundOfCombo1 = '#cc3300';
        this.backgroundOfCentralLine = '#cc3300';
        this.scoreIsSet.emit(this.playerScore + 5);
      }
    } else if (this.reel1Index === 1) {
      if (this.reel2Index === 1) {
        if (this.reel3Index === 1) {
          this.backgroundOfCombo2 = '#cc3300';
          this.backgroundOfBotLine = '#cc3300';
          this.scoreIsSet.emit(this.playerScore + 10);
        } else {
          this.backgroundOfCombo1 = '#cc3300';
          this.backgroundOfBotLine = '#cc3300';
          this.scoreIsSet.emit(this.playerScore + 5);
        }
      } else if (this.reel3Index === 1) {
        this.backgroundOfCombo1 = '#cc3300';
        this.backgroundOfBotLine = '#cc3300';
        this.scoreIsSet.emit(this.playerScore + 5);
      }
    } else if (this.reel2Index === 3 && this.reel3Index === 3) {
      this.backgroundOfCombo1 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 5);
    } else if (this.reel2Index === 2 && this.reel3Index === 2) {
      this.backgroundOfCombo1 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 5);
    } else if (this.reel2Index === 1 && this.reel3Index === 1) {
      this.backgroundOfCombo1 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 5);
    }

    if (this.reel1Index === 5 && this.reel2Index === 5 && this.reel3Index === 5) {
      this.backgroundOfCombo3 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 20);
    } else if (this.reel1Index === 4 && this.reel2Index === 4 && this.reel3Index === 4) {
      this.backgroundOfCombo3 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 20);
    } else if (this.reel1Index === 3 && this.reel2Index === 3 && this.reel3Index === 3) {
      this.backgroundOfCombo3 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 20);
    }

    if (this.reel1Index === 1 && this.reel2Index === 1 && this.reel3Index === 1) {
      this.backgroundOfCombo4 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 50);
    } else if (this.reel1Index === 0 && this.reel2Index === 0 && this.reel3Index === 0) {
      this.backgroundOfCombo4 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 50);
    } else if (this.reel1Index === 9 && this.reel2Index === 9 && this.reel3Index === 9) {
      this.backgroundOfCombo4 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 50);
    }

    if (this.reel1Index === 9 && (this.reel2Index === 7 || this.reel3Index === 7)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel1Index === 8 && (this.reel2Index === 6 || this.reel3Index === 6)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel1Index === 7 && (this.reel2Index === 5 || this.reel3Index === 5)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel2Index === 9 && (this.reel1Index === 7 || this.reel3Index === 7)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel2Index === 8 && (this.reel1Index === 6 || this.reel3Index === 6)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel2Index === 7 && (this.reel1Index === 5 || this.reel3Index === 5)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel3Index === 9 && (this.reel2Index === 7 || this.reel1Index === 7)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel3Index === 8 && (this.reel2Index === 6 || this.reel1Index === 6)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    } else if (this.reel3Index === 7 && (this.reel2Index === 5 || this.reel1Index === 5)) {
      this.backgroundOfCombo5 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 75);
    }

    if (this.reel1Index === 7 && this.reel2Index === 7 && this.reel3Index === 7) {
      this.backgroundOfCombo6 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 150);
    } else if (this.reel1Index === 6 && this.reel2Index === 6 && this.reel3Index === 6) {
      this.backgroundOfCombo6 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 150);
    } else if (this.reel1Index === 5 && this.reel2Index === 5 && this.reel3Index === 5) {
      this.backgroundOfCombo6 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 150);
    }

    if (this.reel1Index === 8 && this.reel2Index === 8 && this.reel3Index === 8) {
      this.backgroundOfCombo7 = '#cc3300';
      this.backgroundOfCentralLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 1000);
    } else if (this.reel1Index === 9 && this.reel2Index === 9 && this.reel3Index === 9) {
      this.backgroundOfCombo8 = '#cc3300';
      this.backgroundOfTopLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 2000);
    } else if (this.reel1Index === 7 && this.reel2Index === 7 && this.reel3Index === 7) {
      this.backgroundOfCombo9 = '#cc3300';
      this.backgroundOfBotLine = '#cc3300';
      this.scoreIsSet.emit(this.playerScore + 4000);
    }
  }
}
