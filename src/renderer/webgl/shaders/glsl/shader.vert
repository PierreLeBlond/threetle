attribute vec3 position;
attribute vec3 color;

uniform mat4 view;
uniform mat4 projection;

varying vec4 vColor;

void main(void ) {
  gl_Position = projection * view * vec4(position, 1.0);
  vColor = vec4(color, 1.0);
}
