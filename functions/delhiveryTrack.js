// /functions/delhiveryTrack.js   (CommonJS for Netlify Functions)
exports.handler = async (event) => {
  const awb = event.queryStringParameters?.awb;
  if (!awb)
    return { statusCode: 400, body: '{"error":"Missing awb"}' };

  const r = await fetch(
    `https://track.delhivery.com/api/v1/packages/json/?waybill=${awb}`,
    { headers: { Authorization: `Bearer ${process.env.DELHIVERY_TOKEN}` } }
  );

  const payload = await r.json();
  return {
    statusCode: r.ok ? 200 : 502,
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
};
