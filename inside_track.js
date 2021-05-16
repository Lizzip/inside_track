'use strict'

class Race {
  constructor() {
    this.maxHorses = 6;
    this.horses = [];

    this.calculateOdds = function() {
      if (this.horses.length < this.maxHorses)
        console.log("Not enough horses in race");
      else {
        this.horses.forEach(horse => horse.calculatePercentage());
        let totalPercent = 0;

        for(let i=0; i < this.horses.length; i++) totalPercent += this.horses[i].getOddsPercentage();

        for(let i=0; i < this.horses.length; i++){
          const oddsPercentage = this.horses[i].getOddsPercentage();
          const actualPercentage = (oddsPercentage/totalPercent) * 100;
          this.horses[i].setTruePercentage(actualPercentage);
        }
      }
        
    };

    this.addHorse = horse => this.horses.push(horse);

    this.newRace = () => this.horses = [];

    this.summary = function() {
      let summary = [];

      for(let i=0; i < this.horses.length; i++){
        let textColour = "text-danger";
        const fraction = this.horses[i].getOddsFraction();
        const percentage = this.horses[i].getOddsPercentage();
        const truePercentage = this.horses[i].getTruePercentage();

        if(truePercentage > percentage) textColour = "text-success";
        summary.push(`<p class="${textColour}" style="font-weight:bold;margin-bottom:0px;">${fraction}: ${truePercentage.toFixed(2)}%</p>`);
      }

      return summary;
    };
  }
}

class Horse {
  constructor(left, right) {
    this.odds = [left, right];

    this.getOddsFraction = () => this.odds.join("/");

    this.getOddsPercentage = () => parseFloat(this.percentage);

    this.setTruePercentage = percentage => this.truePercentage = percentage;

    this.getTruePercentage = () => this.truePercentage;

    this.calculatePercentage = function() {
      const l = this.odds[0];
      const r = this.odds[1];

      const percent = (1 / ((l / r) + 1)) * 100;
      this.percentage = percent;
    };
  }
}


