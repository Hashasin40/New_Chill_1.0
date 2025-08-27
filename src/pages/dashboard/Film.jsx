import kucingProyek from '../../assets/kucing-proyek-foto.png';

function Film() {
  return (
<div style={{ maxWidth: '300px', margin: '0 auto' }}>
  <img
    src={kucingProyek}
    alt="kucing proyek"
    style={{
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '8px',
    }}
  />
</div>
  );
}

export default Film;
