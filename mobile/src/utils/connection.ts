const CONNECTION_FAILURE_PREFIX = 'Connection failed: ';

export const formatConnectionError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? '');
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return 'Could not connect. Check your device name or IP address and try again.';
  }
  if (
    normalized.includes('enotfound') ||
    normalized.includes('getaddrinfo') ||
    normalized.includes('nxdomain') ||
    normalized.includes('name or service not known')
  ) {
    return 'Device not found. Check the device name or IP address and try again.';
  }
  if (normalized.includes('refused') || normalized.includes('econnrefused')) {
    return 'Connection was refused. Make sure Remote Access is enabled on your Helix Stadium.';
  }
  if (normalized.includes('timed out') || normalized.includes('timeout')) {
    return 'Connection timed out. Make sure your Helix Stadium is on the same Wi-Fi network.';
  }
  if (
    normalized.includes('socket') ||
    normalized.includes('handshake') ||
    normalized.includes('ready') ||
    normalized.includes('zmtp') ||
    normalized.includes('osc') ||
    normalized.includes('port') ||
    normalized.includes('reset')
  ) {
    return 'Could not finish connecting. Make sure your Helix Stadium is on the same Wi-Fi network and that Remote Access is enabled.';
  }
  return 'Could not connect to your Helix Stadium. Check the device name or IP address and try again.';
};

export const buildConnectionFailureStatus = (error: unknown) =>
  `${CONNECTION_FAILURE_PREFIX}${formatConnectionError(error)}`;

export const getConnectionErrorMessage = (status: string) => {
  if (!status.startsWith(CONNECTION_FAILURE_PREFIX)) {
    return null;
  }
  return status.slice(CONNECTION_FAILURE_PREFIX.length);
};
