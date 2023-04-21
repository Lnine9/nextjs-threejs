uniform float time;
uniform float size;
uniform float progress;
uniform vec3 target;

attribute float percent;
attribute vec3 color;

varying vec3 vColor;

void main() {
    vec3 dispatchPos;

    float p = min(progress, 1.0);
    float rp = min(percent, p);

    dispatchPos = position + (target - position) * rp;
    dispatchPos.y *= sin(rp * 0.4) * 3.0;


    vColor = color;
    vec4 viewPosition = modelViewMatrix * vec4(dispatchPos, 1.0);

    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = size;
    gl_PointSize *= (20.0 / -viewPosition.z);
    gl_PointSize *= (0.2 + rp);
}
