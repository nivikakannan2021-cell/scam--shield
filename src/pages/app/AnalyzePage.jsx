import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Send,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle,
  FileText,
  AlertCircle,
  Info,
  Image as ImageIcon,
  UploadCloud,
  X,
  Eye,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';
import { SAMPLE_MESSAGES, SAMPLE_SCREENSHOTS } from '../../services/mockData';

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image'
  const [messageText, setMessageText] = useState('');
  
  // Image scan states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [additionalContext, setAdditionalContext] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const { executeAnalysis, executeImageAnalysis, isAnalyzing, analysisMode, analysisStep } = useAnalysis();
  const navigate = useNavigate();

  // Text Handlers
  const handleTrySample = () => {
    setMessageText(SAMPLE_MESSAGES.bankKyc.text);
    setError('');
  };

  const handleClearText = () => {
    setMessageText('');
    setError('');
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setError('Please paste or type a message to analyze.');
      return;
    }

    setError('');
    try {
      await executeAnalysis(messageText);
      navigate('/app/result');
    } catch (err) {
      setError('Analysis failed: ' + err.message);
    }
  };

  // Image Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setError('');
    setImageFile(file);
    setSelectedPresetId(null);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setImagePreview(uploadEvent.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handlePresetScreenshot = (presetKey) => {
    const preset = SAMPLE_SCREENSHOTS[presetKey];
    if (preset) {
      setImagePreview(preset.imageSrc);
      setImageFile({ name: `${preset.title.toLowerCase().replace(/\s+/g, '_')}.png`, size: 142800 });
      setSelectedPresetId(presetKey);
      setAdditionalContext(preset.extractedText);
      setError('');
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setSelectedPresetId(null);
    setAdditionalContext('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imagePreview) {
      setError('Please upload an image or select a sample screenshot.');
      return;
    }

    setError('');
    try {
      await executeImageAnalysis({
        imageSrc: imagePreview,
        imageName: imageFile?.name || "screenshot.png",
        additionalContext: additionalContext,
        presetId: selectedPresetId
      });
      navigate('/app/result');
    } catch (err) {
      setError('Screenshot analysis failed: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "920px", margin: "0 auto", position: "relative" }}>
      {/* Loading Modal / Overlay */}
      {isAnalyzing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(6, 10, 20, 0.9)",
            backdropFilter: "blur(14px)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem"
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "3.5rem 2.5rem",
              maxWidth: "500px",
              width: "100%",
              textAlign: "center",
              border: "1.5px solid rgba(0, 229, 255, 0.45)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 229, 255, 0.25)"
            }}
          >
            {/* Animated Cyber Ring */}
            <div
              style={{
                width: "78px",
                height: "78px",
                borderRadius: "50%",
                background: "rgba(0, 229, 255, 0.12)",
                border: "2px solid rgba(0, 229, 255, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem auto",
                position: "relative"
              }}
            >
              <Loader2 size={42} color="var(--cyan-primary)" className="animate-spin" />
            </div>

            {/* Dynamic Step Text (Image vs Text) */}
            <div style={{ minHeight: "75px", marginBottom: "1.5rem" }}>
              {analysisMode === 'image' ? (
                <>
                  {analysisStep === 1 && (
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.4rem" }}>
                        Running Optical Character Recognition (OCR)...
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        Extracting textual characters, sender codes, and embedded URLs
                      </p>
                    </div>
                  )}
                  {analysisStep === 2 && (
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--cyan-primary)", marginBottom: "0.4rem" }}>
                        Scanning visual spoofing & UI patterns...
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        Detecting counterfeit bank headers, fake security seals & coercive banners
                      </p>
                    </div>
                  )}
                  {analysisStep === 3 && (
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--indigo-primary)", marginBottom: "0.4rem" }}>
                        Synthesizing multi-modal risk score...
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        Merging optical heuristics with ML threat classification engine
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {analysisStep === 1 && (
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.4rem" }}>
                        Analyzing your message...
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        Normalizing tokens and constructing TF-IDF vectors
                      </p>
                    </div>
                  )}
                  {analysisStep === 2 && (
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--cyan-primary)", marginBottom: "0.4rem" }}>
                        Checking suspicious patterns...
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        Scanning for coercive urgency, credential solicitation, and spoofed domains
                      </p>
                    </div>
                  )}
                  {analysisStep === 3 && (
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "700", color: "var(--indigo-primary)", marginBottom: "0.4rem" }}>
                        Calculating risk...
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        Synthesizing multi-signal confidence scores & preventative guidance
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Progress Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: analysisStep >= 1 ? "var(--cyan-primary)" : "rgba(255,255,255,0.1)",
                  boxShadow: analysisStep >= 1 ? "0 0 8px var(--cyan-primary)" : "none",
                  transition: "all 0.3s"
                }}
              />
              <div
                style={{
                  width: "32px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: analysisStep >= 2 ? "var(--cyan-primary)" : "rgba(255,255,255,0.1)",
                  boxShadow: analysisStep >= 2 ? "0 0 8px var(--cyan-primary)" : "none",
                  transition: "all 0.3s"
                }}
              />
              <div
                style={{
                  width: "32px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: analysisStep >= 3 ? "var(--cyan-primary)" : "rgba(255,255,255,0.1)",
                  boxShadow: analysisStep >= 3 ? "0 0 8px var(--cyan-primary)" : "none",
                  transition: "all 0.3s"
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Page Title & Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.85rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
          Analyze Suspicious Content
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
          Inspect raw text, SMS alerts, or upload a screenshot to detect AI-assisted fraud patterns.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          background: "rgba(255, 255, 255, 0.04)",
          padding: "0.4rem",
          borderRadius: "12px",
          border: "1px solid var(--border-subtle)",
          width: "fit-content"
        }}
      >
        <button
          type="button"
          onClick={() => { setActiveTab('text'); setError(''); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.6rem 1.4rem",
            borderRadius: "9px",
            fontSize: "0.92rem",
            fontWeight: activeTab === 'text' ? "700" : "500",
            color: activeTab === 'text' ? "#060a14" : "var(--text-secondary)",
            backgroundColor: activeTab === 'text' ? "var(--cyan-primary)" : "transparent",
            boxShadow: activeTab === 'text' ? "0 2px 10px rgba(0, 229, 255, 0.3)" : "none",
            transition: "all var(--transition-fast)"
          }}
        >
          <FileText size={17} />
          <span>Text Message Scan</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('image'); setError(''); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.6rem 1.4rem",
            borderRadius: "9px",
            fontSize: "0.92rem",
            fontWeight: activeTab === 'image' ? "700" : "500",
            color: activeTab === 'image' ? "#060a14" : "var(--text-secondary)",
            backgroundColor: activeTab === 'image' ? "var(--cyan-primary)" : "transparent",
            boxShadow: activeTab === 'image' ? "0 2px 10px rgba(0, 229, 255, 0.3)" : "none",
            transition: "all var(--transition-fast)",
            position: "relative"
          }}
        >
          <ImageIcon size={17} />
          <span>Screenshot & Image Scan</span>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: "800",
              background: activeTab === 'image' ? "#080c16" : "rgba(0, 229, 255, 0.2)",
              color: activeTab === 'image' ? "#00e5ff" : "#00e5ff",
              padding: "0.15rem 0.45rem",
              borderRadius: "4px",
              marginLeft: "0.2rem"
            }}
          >
            NEW
          </span>
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "0.85rem 1rem",
            borderRadius: "8px",
            background: "var(--risk-high-bg)",
            border: "1px solid var(--risk-high-border)",
            color: "var(--risk-high)",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginBottom: "1.5rem"
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* ================= TAB 1: TEXT ANALYSIS ================= */}
      {activeTab === 'text' && (
        <>
          {/* Sample presets bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "1rem"
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Sparkles size={15} color="var(--cyan-primary)" />
              Quick Test Scenarios:
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={handleTrySample}
                className="btn btn-secondary btn-sm"
                style={{
                  borderColor: "rgba(0, 229, 255, 0.35)",
                  color: "var(--cyan-primary)",
                  background: "rgba(0, 229, 255, 0.08)"
                }}
              >
                Try Sample Scam (Bank KYC)
              </button>

              <button
                type="button"
                onClick={() => setMessageText(SAMPLE_MESSAGES.lottery.text)}
                className="btn btn-secondary btn-sm"
              >
                Lottery Prize Scam
              </button>

              <button
                type="button"
                onClick={() => setMessageText(SAMPLE_MESSAGES.delivery.text)}
                className="btn btn-secondary btn-sm"
              >
                Delivery Smishing
              </button>

              <button
                type="button"
                onClick={() => setMessageText(SAMPLE_MESSAGES.safe.text)}
                className="btn btn-secondary btn-sm"
              >
                Safe Workplace Message
              </button>
            </div>
          </div>

          {/* Textarea Card */}
          <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
            <form onSubmit={handleTextSubmit}>
              <div style={{ position: "relative" }}>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Paste or type the suspicious message here..."
                  rows={8}
                  style={{
                    width: "100%",
                    minHeight: "220px",
                    resize: "vertical",
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                    backgroundColor: "var(--bg-input)",
                    border: "1.5px solid var(--border-light)",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    marginBottom: "0.75rem"
                  }}
                />

                {/* Character & word counter */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    padding: "0 0.25rem"
                  }}
                >
                  <span>
                    {messageText.trim().length > 0
                      ? `${messageText.trim().split(/\s+/).length} words`
                      : "0 words"}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>
                    {messageText.length} characters
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.5rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--border-subtle)",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <button
                  type="button"
                  onClick={handleClearText}
                  disabled={!messageText}
                  className="btn btn-secondary"
                  style={{ opacity: messageText ? 1 : 0.5 }}
                >
                  <Trash2 size={16} />
                  <span>Clear</span>
                </button>

                <button
                  type="submit"
                  disabled={isAnalyzing || !messageText.trim()}
                  className="btn btn-primary btn-lg"
                  style={{ padding: "0.85rem 2rem", opacity: messageText.trim() ? 1 : 0.6 }}
                >
                  <ShieldAlert size={18} />
                  <span>Analyze Message</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ================= TAB 2: SCREENSHOT / IMAGE SCAN ================= */}
      {activeTab === 'image' && (
        <>
          {/* Preset Sample Screenshots Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginBottom: "1.25rem"
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Camera size={15} color="var(--cyan-primary)" />
              Try Realistic Sample Screenshots:
            </span>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={() => handlePresetScreenshot('bankKycScreenshot')}
                className="btn btn-secondary btn-sm"
                style={{
                  borderColor: selectedPresetId === 'bankKycScreenshot' ? "var(--cyan-primary)" : "rgba(0, 229, 255, 0.35)",
                  color: "var(--cyan-primary)",
                  background: selectedPresetId === 'bankKycScreenshot' ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 229, 255, 0.08)"
                }}
              >
                Chase Bank KYC Screenshot
              </button>

              <button
                type="button"
                onClick={() => handlePresetScreenshot('deliveryScreenshot')}
                className="btn btn-secondary btn-sm"
                style={{
                  borderColor: selectedPresetId === 'deliveryScreenshot' ? "var(--risk-med)" : "var(--border-subtle)"
                }}
              >
                DHL Delivery Smishing
              </button>

              <button
                type="button"
                onClick={() => handlePresetScreenshot('cryptoScreenshot')}
                className="btn btn-secondary btn-sm"
                style={{
                  borderColor: selectedPresetId === 'cryptoScreenshot' ? "var(--risk-high)" : "var(--border-subtle)"
                }}
              >
                Elon Musk Crypto Giveaway
              </button>
            </div>
          </div>

          {/* Upload Card */}
          <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
            <form onSubmit={handleImageSubmit}>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {!imagePreview ? (
                /* Drag and drop zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragging ? "var(--cyan-primary)" : "rgba(0, 229, 255, 0.3)"}`,
                    backgroundColor: isDragging ? "rgba(0, 229, 255, 0.08)" : "rgba(10, 15, 29, 0.6)",
                    borderRadius: "14px",
                    padding: "3.5rem 2rem",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    boxShadow: isDragging ? "0 0 25px rgba(0, 229, 255, 0.2)" : "none"
                  }}
                >
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      background: "rgba(0, 229, 255, 0.1)",
                      border: "1px solid rgba(0, 229, 255, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.25rem auto"
                    }}
                  >
                    <UploadCloud size={32} color="var(--cyan-primary)" />
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>
                    Drop your screenshot here, or <span style={{ color: "var(--cyan-primary)" }}>browse file</span>
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: "460px", margin: "0 auto 1rem auto" }}>
                    Supports PNG, JPG, JPEG, or WEBP screenshots of suspicious SMS alerts, phishing emails, or counterfeit banking portals.
                  </p>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    MAX FILE SIZE: 10MB • OPTICAL CHARACTER RECOGNITION (OCR) ENABLED
                  </div>
                </div>
              ) : (
                /* Uploaded Image Preview */
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <Eye size={18} color="var(--cyan-primary)" />
                      <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "#ffffff" }}>
                        Selected Screenshot Preview
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="btn btn-secondary btn-sm"
                      style={{ color: "var(--risk-high)", borderColor: "var(--risk-high-border)" }}
                    >
                      <X size={15} />
                      <span>Remove Image</span>
                    </button>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1.5px solid rgba(0, 229, 255, 0.3)",
                      backgroundColor: "#050811",
                      maxHeight: "360px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1rem"
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Uploaded threat screenshot"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "320px",
                        objectFit: "contain",
                        borderRadius: "8px"
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "1rem",
                        background: "rgba(8, 12, 22, 0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid var(--border-subtle)",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        color: "var(--cyan-primary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem"
                      }}
                    >
                      <CheckCircle size={14} />
                      <span>OCR Ready: {imageFile?.name || "screenshot.png"}</span>
                    </div>
                  </div>

                  {/* Optional Context Field */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "600", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      Optional: Sender info, extracted text preview, or additional context
                    </label>
                    <input
                      type="text"
                      value={additionalContext}
                      onChange={(e) => setAdditionalContext(e.target.value)}
                      placeholder="e.g. Sender: +1-800-CHASE, received on WhatsApp / SMS"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.75rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--border-subtle)",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}
              >
                <button
                  type="button"
                  onClick={handleClearImage}
                  disabled={!imagePreview}
                  className="btn btn-secondary"
                  style={{ opacity: imagePreview ? 1 : 0.5 }}
                >
                  <Trash2 size={16} />
                  <span>Clear Selection</span>
                </button>

                <button
                  type="submit"
                  disabled={isAnalyzing || !imagePreview}
                  className="btn btn-primary btn-lg"
                  style={{ padding: "0.85rem 2rem", opacity: imagePreview ? 1 : 0.6 }}
                >
                  <Camera size={18} />
                  <span>Analyze Screenshot</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Security note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
          padding: "0 0.5rem"
        }}
      >
        <Info size={16} color="var(--cyan-primary)" />
        <span>ScamShield AI processes screenshots client-side. No sensitive images, credentials, or phone numbers are transmitted to external marketing servers.</span>
      </div>
    </div>
  );
}
