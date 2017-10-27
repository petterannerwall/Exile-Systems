import 'rxjs/add/operator/map';
import { ElectronService } from './electron.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FFIService {


  user32: any;
  kernel32: any;

  constructor(private electron: ElectronService) {
    this.user32 = new electron.ffi.Library('user32', {
      'GetTopWindow': ['long', ['long']],
      'FindWindowA': ['long', ['string', 'string']],
      'SetActiveWindow': ['long', ['long']],
      'SetForegroundWindow': ['bool', ['long']],
      'BringWindowToTop': ['bool', ['long']],
      'ShowWindow': ['bool', ['long', 'int']],
      'SwitchToThisWindow': ['void', ['long', 'bool']],
      'GetForegroundWindow': ['long', []],
      'AttachThreadInput': ['bool', ['int', 'long', 'bool']],
      'GetWindowThreadProcessId': ['int', ['long', 'int']],
      'SetWindowPos': ['bool', ['long', 'long', 'int', 'int', 'int', 'int', 'uint']],
      'SetFocus': ['long', ['long']]
    });

    this.kernel32 = new electron.ffi.Library('Kernel32.dll', {
      'GetCurrentThreadId': ['int', []]
    });

    // const winToSetOnTop = user32.FindWindowA(null, 'Path of Exile')
    // const foregroundHWnd = user32.GetForegroundWindow()
    // const currentThreadId = kernel32.GetCurrentThreadId()
    // const windowThreadProcessId = user32.GetWindowThreadProcessId(foregroundHWnd, null)
    // const showWindow = user32.ShowWindow(winToSetOnTop, 9)
    // const setWindowPos1 = user32.SetWindowPos(winToSetOnTop, -1, 0, 0, 0, 0, 3)
    // const setWindowPos2 = user32.SetWindowPos(winToSetOnTop, -2, 0, 0, 0, 0, 3)
    // const setForegroundWindow = user32.SetForegroundWindow(winToSetOnTop)
    // const attachThreadInput = user32.AttachThreadInput(windowThreadProcessId, currentThreadId, 0)
    // const switchToWindow = user32.SwitchToThisWindow(winToSetOnTop)
    // const setFocus = user32.SetFocus(winToSetOnTop)
    // const setActiveWindow = user32.SetActiveWindow(winToSetOnTop)
  }

  public switchToPathWindow() {
    const winToSetOnTop = this.user32.FindWindowA(null, 'Path of Exile')
    // const foregroundHWnd = this.user32.GetForegroundWindow()
    // const currentThreadId = this.kernel32.GetCurrentThreadId()
    // const windowThreadProcessId = this.user32.GetWindowThreadProcessId(foregroundHWnd, null)
    const showWindow = this.user32.ShowWindow(winToSetOnTop, 9)
    // const setWindowPos1 = this.user32.SetWindowPos(winToSetOnTop, -1, 0, 0, 0, 0, 3)
    // const setWindowPos2 = this.user32.SetWindowPos(winToSetOnTop, -2, 0, 0, 0, 0, 3)
    const setForegroundWindow = this.user32.SetForegroundWindow(winToSetOnTop)
    // const attachThreadInput = this.user32.AttachThreadInput(windowThreadProcessId, currentThreadId, 0)
    const switchToWindow = this.user32.SwitchToThisWindow(winToSetOnTop, true)
    const setFocus = this.user32.SetFocus(winToSetOnTop)
    const setActiveWindow = this.user32.SetActiveWindow(winToSetOnTop)
  }
}
