attribute float aIndex;

uniform float uTime;
uniform vec3 uColor;
uniform float uLength;

varying float vSize;
varying vec3 vColor;

void main(){
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    float strength = (uLength - (uTime - aIndex)) / uLength;

    if(aIndex < uTime) {
        vSize = strength * 15.0;
    }
    vColor = uColor * strength ;
    gl_PointSize = vSize;
    gl_PointSize *= 3.0 / -viewPosition.z;
}