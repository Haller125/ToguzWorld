const MusicControl = ({ toggleMelody, melodyPlaying, audioRef }) => {
  const handleVolumeChange = (e) => {
    if (audioRef.current) {
      audioRef.current.volume = e.target.value / 100;
    }
  };

  return (
    <div className="music-control" style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={toggleMelody}>
        {melodyPlaying ? 'Muzykany söndıru' : 'Muzykany qosu'}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        onChange={handleVolumeChange}
        defaultValue="50"
      />
    </div>
  );
};

export default MusicControl;
