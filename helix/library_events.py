"""Library-operation notifications introduced in Stadium firmware 1.4."""

import re

_OPERATION = re.compile(r"^/(ir|clone)(Import|Delete)(Begin|Progress|End)$")


def parse_library_operation(address: str, values):
    """Classify an event without guessing meanings for undocumented counters.

    Change messages start with command and sequence integers. ``fields`` keeps
    the remaining payload intact; import-end counters do not imply success.
    """
    match = _OPERATION.fullmatch(address)
    if not match or not isinstance(values, (list, tuple)):
        return None
    kind, operation, phase = match.groups()
    payload_types = (int, str) if phase == "Begin" else (int, int)
    if phase == "End":
        payload_types = (int,) * (4 if operation == "Import" else 1)
    expected = (int, int, *payload_types)
    if len(values) != len(expected) or any(
        type(value) is not value_type
        for value, value_type in zip(values, expected, strict=True)
    ):
        return None
    return {
        "kind": kind,
        "operation": operation.lower(),
        "phase": phase.lower(),
        "command_id": values[0],
        "sequence": values[1],
        "fields": list(values[2:]),
    }
