/* eslint-disable @typescript-eslint/no-explicit-any */
export class SpeechHandler {
  private recognition: any;
  private isListening: boolean = false;
  private onResultCallback: (text: string) => void;
  private onEndCallback: () => void;
  private onErrorCallback: (err: any) => void;

  constructor(
    onResult: (text: string) => void,
    onEnd: () => void,
    onError: (err: any) => void
  ) {
    this.onResultCallback = onResult;
    this.onEndCallback = onEnd;
    this.onErrorCallback = onError;

    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = "id-ID"; // Indonesian language
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          this.onResultCallback(transcript);
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.onEndCallback();
        };

        this.recognition.onerror = (event: any) => {
          this.isListening = false;
          this.onErrorCallback(event.error);
        };
      }
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  get isSupported(): boolean {
    return !!this.recognition;
  }
}
