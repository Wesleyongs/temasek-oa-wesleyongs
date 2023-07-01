import datetime as dt

def unix_int_to_ts(unix_int: int):
    return dt.datetime.utcfromtimestamp(unix_int / 1000).replace(tzinfo=dt.timezone.utc)
