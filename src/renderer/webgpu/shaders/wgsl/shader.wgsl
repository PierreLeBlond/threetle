struct VertexOut {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f
}

struct Camera {
  projection: mat4x4<f32>,
  view: mat4x4<f32>,
}

@group(0) @binding(0) var<uniform> camera: Camera;

@vertex
fn vertex_main(@location(0) position: vec4f,
               @location(1) color: vec4f) -> VertexOut
{
  var output : VertexOut;
  output.position = camera.projection * camera.view * position;
  output.color = color;
  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
{
  return fragData.color;
}