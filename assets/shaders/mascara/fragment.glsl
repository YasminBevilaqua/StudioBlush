precision highp float;

uniform vec4 color;
uniform sampler2D map;
uniform float _intensity;
varying vec2 vUv;

void main() {
    vec2 offsetUv = vUv + vec2(0, -0.02); // اعمال آفست به مختصات UV
    offsetUv = vec2(offsetUv.x,offsetUv.y*1.2);
    float alphaFromTexture = texture2D(map, offsetUv).a * 0.5 * _intensity;
    vec4 baseColor = vec4(color.rgb, alphaFromTexture);
    gl_FragColor = baseColor;
}

