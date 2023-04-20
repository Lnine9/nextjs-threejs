attribute float aIndex;

uniform float uTime;
uniform vec3 uColor;

varying float vSize;
varying vec3 vColor;

void main(){
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1);
    gl_Position = projectionMatrix * viewPosition;

    if(aIndex < uTime + 100.0 && aIndex > uTime - 100.0) {
        vSize = (aIndex * 2.0 + 100.0 - uTime) / 20.0;
    }
    vColor = vec3(1.0 * (uTime / 100.0), 0.45, 0.4) ;
    gl_PointSize = vSize;
}