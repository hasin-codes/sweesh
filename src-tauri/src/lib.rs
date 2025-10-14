use tauri::Manager;

#[tauri::command]
async fn request_microphone_permission() -> Result<bool, String> {
  // On Windows, we can request microphone permission through the system
  // This is a simplified approach - in a real app you'd use proper Windows APIs
  Ok(true) // For now, assume permission is granted
}

#[tauri::command]
async fn show_voice_popup(app: tauri::AppHandle) -> Result<(), String> {
  // Create a popup window for the voice widget
  let popup = tauri::WebviewWindowBuilder::new(&app, "voice-popup", tauri::WebviewUrl::App("/voice-popup".into()))
    .title("Sweesh Voice Widget")
    .inner_size(190.0, 64.0)
    .decorations(false)
    .transparent(true)
    .always_on_top(true)
    .resizable(false)
    .skip_taskbar(true)
    .build()
    .map_err(|e| e.to_string())?;

  // Position the popup near the bottom right of screen
  if let Ok(monitor) = popup.primary_monitor() {
    if let Some(monitor) = monitor {
      let screen_width = monitor.size().width as f64;
      let screen_height = monitor.size().height as f64;
      let x = screen_width - 200.0; // 190 width + 10 margin
      let y = screen_height - 100.0; // Near bottom of screen
      let _ = popup.set_position(tauri::Position::Logical(tauri::LogicalPosition::new(x, y)));
    }
  }
  
  popup.show().map_err(|e| e.to_string())?;
  popup.set_focus().map_err(|e| e.to_string())?;
  Ok(())
}

#[tauri::command]
async fn hide_voice_popup(app: tauri::AppHandle) -> Result<(), String> {
  if let Some(window) = app.get_webview_window("voice-popup") {
    window.hide().map_err(|e| e.to_string())?;
  }
  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_store::Builder::default().build())
    .invoke_handler(tauri::generate_handler![
      request_microphone_permission,
      show_voice_popup,
      hide_voice_popup
    ])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
