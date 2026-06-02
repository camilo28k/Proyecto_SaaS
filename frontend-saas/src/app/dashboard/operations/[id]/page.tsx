export default async function OperationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="detail-card">
      <p className="page-kicker">Detalle de operacion</p>
      <h1 className="page-title">Operacion {id}</h1>
      <p className="page-copy">
        Aqui puedes cargar el precio final, usuario, servicio relacionado y estado de seguimiento.
      </p>
    </section>
  );
}
