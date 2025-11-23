import { useApp } from '../../context/AppContext';

const icons = {
  success: 'fa-check-circle',
  error: 'fa-times-circle',
  info: 'fa-info-circle'
};

const Toast = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon">
            <i className={`fas ${icons[toast.type]}`}></i>
          </div>
          <div className="toast-content">
            <h4>{toast.title}</h4>
            <p>{toast.message}</p>
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
