# ARENA OF HONOR - DATA MODEL

## Users

- name( string, required)
- surname( string, required)
- email( string, required)
- password( string, required)

## Characters

- name( string, required)
- class( string, required)
- win_streak( number, required)
- max_win_streak( number, required)
- user_id( ObjectId, ref: 'User', required)
