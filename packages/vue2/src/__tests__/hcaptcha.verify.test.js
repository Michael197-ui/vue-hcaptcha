import { mount } from '@vue/test-utils';
import VueHcaptcha from '../hcaptcha.vue';

// Minimal mock for window.hcaptcha used by the component
function createMockHcaptcha() {
  let renderCallback;
  return {
    render(el, opts) {
      // save callback functions so we can invoke them later via the instance
      renderCallback = opts['callback'];
      // return a fake widget id
      return 42;
    },
    getResponse(widgetId) {
      if (widgetId === 42) return 'token-123';
      return '';
    },
    getRespKey(widgetId) {
      if (widgetId === 42) return 'ekey-abc';
      return '';
    },
    execute(widgetId) {
      // simulate immediate callback invocation
      if (renderCallback) renderCallback();
    },
    reset() {},
    remove() {}
  };
}

describe('VueHcaptcha verify flow', () => {
  let originalHcaptcha;

  beforeEach(() => {
    originalHcaptcha = window.hcaptcha;
    window.hcaptcha = createMockHcaptcha();
  });

  afterEach(() => {
    window.hcaptcha = originalHcaptcha;
  });

  it('emits verify when hcaptcha callback runs', async () => {
    const wrapper = mount(VueHcaptcha, {
      propsData: { sitekey: 'test-sitekey' }
    });

    // wait a tick for mounted hook to run and render to happen
    await wrapper.vm.$nextTick();

    // trigger execute which will call the saved callback and cause verify
    wrapper.vm.execute();

    // wait for verify emission to propagate
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted('verify');
    expect(emitted).toBeTruthy();
    // verify event payload contains token and eKey (component reads from hcaptcha)
    const [token, eKey] = emitted[0];
    expect(token).toBe('token-123');
    expect(eKey).toBe('ekey-abc');
  });
});
