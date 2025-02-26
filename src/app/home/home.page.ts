import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  scannedValue: string = ''; // Store the scanned barcode value
  scannedData: string = '';
  // window: any = window;
  data : any='';
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.initializeScanner();
    });
  }





  // window.plugins.honeywell.init(function(result) {
  //   console.log('Barcode scanned: ' + result.data);
  //   console.log('Code: ' + result.code);
  //   console.log('Timestamp: ' + result.timestamp);
  //   console.log('Charset: ' + result.charset);
  //   console.log('Aim ID: ' + result.aimId);
  // }, function (error) => {
  //   console.log('Error occured: ' + error);
  // });


  initializeScanner() {
  
    (<any>window).plugins.honeywell.listen(function(result:any) {
      console.log('Barcode scanned: ' + result);
      // console.log('Code: ' + result.code);
      // console.log('Timestamp: ' + result.timestamp);
      // console.log('Charset: ' + result.charset);
      // console.log('Aim ID: ' + result.aimId);
    },  function(error:any){
      console.log('Error occured: ' + error);
    });
  }

  // Optional: Trigger a software scan (not using hardware buttons)
  scanBarcode() {
    // declare const window: any;
    const honeywellWindow = window as any;
    if (honeywellWindow.plugins && honeywellWindow.plugins.honeywell) {
      honeywellWindow.plugins.honeywell.scan(
        (data: any) => {
          this.scannedData = data;
          console.log('Software scan result:', data);
        },
        (error: any) => {
          console.error('Software scan error:', error);
        }
      );
    }
  }

  // Cleanup when leaving the page
  ngOnDestroy() {
    // declare const window: any;
    const honeywellWindow = window as any;
    if (honeywellWindow.plugins && honeywellWindow.plugins.honeywell) {
      honeywellWindow.plugins.honeywell.release();
      console.log('Scanner released');
    }
  }



scanPressed
  () {
    (<any>window).plugins.honeywell.softwareTriggerStart((data)=> {
      console.log('Software scan: ' + data);
      alert('Software scan: ' + data)
    }, (error)=> {
      console.log('Error occured: ' + error);
    });
  }
  scanReleased() {
    (<any>window).plugins.honeywell.softwareTriggerStop();
  }
}