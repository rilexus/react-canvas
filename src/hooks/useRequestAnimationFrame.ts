import { useEffect, useRef, useState } from "react";

export interface Frame {
  time: number;
  start: () => void;
  stop: () => void;
  getTime: () => number;
  getFrameID: () => number;
}

export function createAnimationFrame(callback: any): Frame {
  let _frameID = -1;
  let _time = 0;

  function requestFrame(time: any) {
    _frameID = requestAnimationFrame(requestFrame);
    _time = time;
    frameObj.time = time;
    callback(frameObj);
  }

  const frameObj: Frame = {
    time: _time,
    start: function() {
      if (_frameID === -1) requestFrame(0);
    },
    getTime: function gt() {
      return _time;
    },
    getFrameID: function s() {
      return _frameID;
    },
    stop: function() {
      cancelAnimationFrame(_frameID);
      _frameID = -1;
    }
  };

  return frameObj;
}

export function useRequestAnimationFrame(
  callback: (frame: any, time: number) => void
): Frame | undefined {
  const [f, setF] = useState<Frame | undefined>(undefined);
  const cbRef = useRef<any>(callback);

  useEffect(() => {
    cbRef.current = callback;
  }, []);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  function startFrame() {
    const frame = createAnimationFrame((frame: any) => {
      cbRef.current(frame);
    });
    frame.start();
    setF(frame);
  }

  useEffect(() => {
    startFrame();
    return () => {
      f && f.stop();
    };
  }, []);
  return f;
}
